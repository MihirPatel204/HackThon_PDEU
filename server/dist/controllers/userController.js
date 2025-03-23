"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.updateUser = exports.getUserById = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phoneNumber, address, ssn, dateOfBirth } = req.body;
        // Validate required fields
        if (!firstName || !lastName || !email || !phoneNumber || !address || !ssn || !dateOfBirth) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        // Check if user with this email or SSN already exists
        const existingUser = yield User_1.default.findOne({
            $or: [{ email }, { ssn }]
        });
        if (existingUser) {
            res.status(409).json({ message: 'User with this email or SSN already exists' });
            return;
        }
        // Create new user
        const newUser = new User_1.default({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            ssn,
            dateOfBirth: new Date(dateOfBirth)
        });
        const savedUser = yield newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            }
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.createUser = createUser;
// Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield User_1.default.findById(userId);
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
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            message: 'Error fetching user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getUserById = getUserById;
// Update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updates = req.body;
        // Don't allow updates to SSN for security reasons
        if (updates.ssn) {
            delete updates.ssn;
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });
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
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Error updating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.updateUser = updateUser;
// Get all users (for admin purposes)
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}, { ssn: 0 }); // Exclude SSN from results
        res.status(200).json(users.map(user => ({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })));
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            message: 'Error fetching users',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getAllUsers = getAllUsers;
