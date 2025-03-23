"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Create a new user
router.post('/', userController_1.createUser);
// Get user by ID
router.get('/:id', userController_1.getUserById);
// Update user
router.put('/:id', userController_1.updateUser);
// Get all users (admin route)
router.get('/', userController_1.getAllUsers);
exports.default = router;
