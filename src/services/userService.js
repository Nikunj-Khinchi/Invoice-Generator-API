const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const config = require('../configs/envConfig');


const registerUser = async ({ username, password, email, phone, role, address }) => {

    try {
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            logger.error(`User already exists: ${email}`);
            throw new Error('User already exists');
        }

        const user = new User({
            username,
            password,
            email,
            phone,
            role,
            address
        });

        await user.save();
        logger.info(`User registered with email: ${email}`);
        return user;
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        throw error;
    };
}


const loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.error(`User not found: ${email}`);
            throw new Error('Invalid credentials');
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            logger.error(`Invalid password: ${email}`);
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ _id : user._id, email: user.email, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
        logger.info(`User logged in with email: ${email}`);

        return { user, token };
    } catch (error) {
        logger.error(`Error logging in user: ${error.message}`);
        throw error;
    };
}

const getUserProfile = async ({userId}) => {

    try {
        const user = await User.findById({
            _id: userId,
            where: { isDeleted: false },
        });

        if (!user) {
            logger.error(`User not found: ${userId}`);
            throw new Error('User not found');
        }
        logger.info(`User profile retrieved for: ${userId}`);
        return user;
    } catch (error) {
        logger.error(`Error getting user profile: ${error.message}`);
        throw error;
    }
};


const updateUser = async ({ userId, username, email, phone , address }) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, isDeleted: false },
            { $set: { username, email, phone, address } },
            { new: true, runValidators: true}
        );

        if (!updatedUser) {
            logger.error(`User not found: ${userId}`);
            throw new Error('User not found');
        }

        logger.info(`User profile updated for: ${userId}`);
        return updatedUser;
    } catch (error) {
        logger.error(`Error updating user profile: ${error.message}`);
        throw error;
    }
};

const deleteUser = async ({ userId }) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, isDeleted: false },
            { $set: { isDeleted: true } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            logger.error(`User not found: ${userId}`);
            throw new Error('User not found');
        }

        logger.info(`User marked as deleted: ${userId}`);
        return updatedUser;
    } catch (error) {
        logger.error(`Error marking user as deleted: ${error.message}`);
        throw error;
    }
};




module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser
};
