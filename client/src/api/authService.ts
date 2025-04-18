import {
  fetchWithAuth,
  apiHandler,
  setAuthToken,
  setRefreshToken,
  clearTokens,
  getAuthToken,
} from './config';

// Types
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  user: any;
  token: string;
  refreshToken: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

// API functions
const authService = {
  // Register a new user
  async register(name: string, email: string, password: string): Promise<any> {
    const [firstName, lastName] = name.trim().split(' ');
    const data = {
      firstName: firstName || name,
      lastName: lastName || '',
      email,
      password,
      // Adding required fields with default values
      phoneNumber: '000-000-0000',
      address: 'Default Address',
      ssn: '123-45-6789', // This is just a placeholder for development
      dateOfBirth: new Date().toISOString()
    };

    const response = await fetchWithAuth('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await apiHandler<LoginResponse>(response);
    
    // Store tokens
    setAuthToken(result.token);
    setRefreshToken(result.refreshToken);
    
    return result.user;
  },

  // Login a user
  async login(email: string, password: string): Promise<any> {
    // Create a mock response since the server doesn't have a login endpoint yet
    // In a real app, you would use the actual server endpoint
    // const response = await fetchWithAuth('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    // });
    
    // Mock login for testing
    const userData = {
      id: '1',
      name: email.split('@')[0],
      email: email
    };
    
    // Store tokens (mocked for now)
    const token = 'mock_token_' + Date.now();
    setAuthToken(token);
    setRefreshToken(token + '_refresh');
    
    return userData;
  },

  // Logout a user
  async logout(): Promise<void> {
    try {
      await fetchWithAuth('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API fails
    } finally {
      // Clear tokens regardless of API response
      clearTokens();
    }
  },

  // Get current user
  async getCurrentUser(): Promise<any | null> {
    try {
      // For testing, return a mock user based on stored token
      const token = getAuthToken();
      if (!token) {
        return null;
      }
      
      // Return mock user data
      return {
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      };
      
      // In a real app with proper endpoints, you would uncomment this:
      // const response = await fetchWithAuth('/users/me');
      // return await apiHandler<any>(response);
    } catch (error) {
      console.error('Get current user error:', error);
      clearTokens(); // Clear invalid tokens
      return null;
    }
  },

  // Update user profile
  async updateProfile(userId: string, data: UpdateProfileData): Promise<any> {
    const response = await fetchWithAuth(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    return apiHandler<any>(response);
  },

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await fetchWithAuth('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    await apiHandler<void>(response);
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    const response = await fetchWithAuth('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    await apiHandler<void>(response);
  },

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetchWithAuth('/auth/reset-password/confirm', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });

    await apiHandler<void>(response);
  },

  // Delete account
  async deleteAccount(password: string): Promise<void> {
    const response = await fetchWithAuth('/auth/delete-account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });

    await apiHandler<void>(response);
    clearTokens();
  },
};

export default authService; 