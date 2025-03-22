import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phoneNumber, address, ssn, dateOfBirth } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !address || !ssn || !dateOfBirth) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Check if user with this email or SSN already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { ssn }] 
    });

    if (existingUser) {
      res.status(409).json({ message: 'User with this email or SSN already exists' });
      return;
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      ssn,
      dateOfBirth: new Date(dateOfBirth)
    });

    const savedUser = await newUser.save();
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      message: 'Error creating user',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      dateOfBirth: user.dateOfBirth
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      message: 'Error fetching user',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    
    // Don't allow updates to SSN for security reasons
    if (updates.ssn) {
      delete updates.ssn;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        dateOfBirth: updatedUser.dateOfBirth
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      message: 'Error updating user',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Get all users (for admin purposes)
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, { ssn: 0 }); // Exclude SSN from results
    
    res.status(200).json(
      users.map(user => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }))
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}; 