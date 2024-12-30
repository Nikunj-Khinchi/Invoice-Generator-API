
const WriteResponse = require('../utils/response');
const logger = require('../utils/logger');
const userService = require('../services/userService');



const createUser = async (req, res) => {
    try {
        const { username, password, email, phone, role, address } = req.body;
        const user = await userService.registerUser({ username, password, email, phone, role, address });

        return WriteResponse(res, 201, 'User registered successfully', user );

    } catch (error) {
        return WriteResponse(res, 500, "Error creating user", error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userService.loginUser({email, password});

        return WriteResponse(res, 200, 'User logged in successfully', response);
    } catch (error) {
        return WriteResponse(res, 500, "Error logging in", error.message);
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { username, email, phone, address } = req.body;
        const updatedUser = await userService.updateUser({ userId, username, email, phone, address });
;
        return WriteResponse(res, 200, "User profile updated successfully", updatedUser);
    } catch (error) {
        return WriteResponse(res, 500, "Error updating user profile", error.message);
    }
};


const deleteUserProfile = async (req, res) => {
    try {
        const userId  = req.user._id;
        const updatedUser = await userService.deleteUser({ userId });

        return WriteResponse(res, 200, "User deleted successfully", updatedUser);
    } catch (error) {
        return WriteResponse(res, 500, { message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId= req.user._id;
        console.log(req.user);
        const user = await userService.getUserProfile({ userId });
        return WriteResponse(res, 200, "User profile retrieved successfully", user);
    }
    catch (error) {
        return WriteResponse(res, 500, "Error getting user profile", error.message);
    }
}

module.exports = {
    createUser,
    login,
    updateUserProfile,
    deleteUserProfile,
    getUserProfile
};