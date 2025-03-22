import { fetchWithAuth, apiHandler } from './config';

// Types
interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  pushNotifications: boolean;
  scoreChanges: boolean;
  reportUpdates: boolean;
  promotionalOffers: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  passwordExpiryDays: number;
  loginAttempts: number;
  lastLoginIp: string;
  lastLoginTimestamp: string;
}

// API functions
const userService = {
  // Get user by ID
  async getUserById(userId: string): Promise<UserData> {
    const response = await fetchWithAuth(`/users/${userId}`);
    return apiHandler<UserData>(response);
  },

  // Update user data
  async updateUser(userId: string, data: Partial<UserData>): Promise<UserData> {
    const response = await fetchWithAuth(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return apiHandler<UserData>(response);
  },

  // Get notification preferences
  async getNotificationPreferences(userId: string): Promise<NotificationPreferences> {
    const response = await fetchWithAuth(`/users/${userId}/notification-preferences`);
    return apiHandler<NotificationPreferences>(response);
  },

  // Update notification preferences
  async updateNotificationPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    const response = await fetchWithAuth(`/users/${userId}/notification-preferences`, {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
    return apiHandler<NotificationPreferences>(response);
  },

  // Get security settings
  async getSecuritySettings(userId: string): Promise<SecuritySettings> {
    const response = await fetchWithAuth(`/users/${userId}/security-settings`);
    return apiHandler<SecuritySettings>(response);
  },

  // Update security settings
  async updateSecuritySettings(
    userId: string,
    settings: Partial<SecuritySettings>
  ): Promise<SecuritySettings> {
    const response = await fetchWithAuth(`/users/${userId}/security-settings`, {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
    return apiHandler<SecuritySettings>(response);
  },

  // Enable two-factor authentication
  async enableTwoFactor(userId: string, phoneNumber: string): Promise<{ secret: string; qrCode: string }> {
    const response = await fetchWithAuth(`/users/${userId}/two-factor/enable`, {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    });
    return apiHandler<{ secret: string; qrCode: string }>(response);
  },

  // Verify and activate two-factor authentication
  async verifyTwoFactor(userId: string, code: string): Promise<void> {
    const response = await fetchWithAuth(`/users/${userId}/two-factor/verify`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    await apiHandler<void>(response);
  },

  // Disable two-factor authentication
  async disableTwoFactor(userId: string, password: string): Promise<void> {
    const response = await fetchWithAuth(`/users/${userId}/two-factor/disable`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    await apiHandler<void>(response);
  },

  // Get user activity log
  async getUserActivityLog(userId: string, page = 1, limit = 10): Promise<any> {
    const response = await fetchWithAuth(`/users/${userId}/activity-log?page=${page}&limit=${limit}`);
    return apiHandler<any>(response);
  },

  // Request data export
  async requestDataExport(userId: string): Promise<{ requestId: string }> {
    const response = await fetchWithAuth(`/users/${userId}/export-data`, {
      method: 'POST',
    });
    return apiHandler<{ requestId: string }>(response);
  },

  // Check export status
  async checkExportStatus(userId: string, requestId: string): Promise<{ status: string; downloadUrl?: string }> {
    const response = await fetchWithAuth(`/users/${userId}/export-data/${requestId}`);
    return apiHandler<{ status: string; downloadUrl?: string }>(response);
  },

  // Get connected bureaus
  async getConnectedBureaus(userId: string): Promise<any[]> {
    const response = await fetchWithAuth(`/users/${userId}/connected-bureaus`);
    return apiHandler<any[]>(response);
  },
};

export default userService; 