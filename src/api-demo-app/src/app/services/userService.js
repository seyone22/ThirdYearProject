import bcryptjs from 'bcryptjs';
import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';

export const getUser = async (email) => {
    try {
        await dbConnect();
        return await User.findOne({ email });
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error(error);
    }
};

export const deleteUser = async (id) => {
    try {
        await dbConnect();
        console.log(id)
        return await User.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error(error);
    }
};

export const toggleAdmin = async (id) => {
    try {
        await dbConnect();
        console.log(id);

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        // Determine the new type based on the current type
        const newType = user.type === 'admin' ? 'partner' : 'admin';

        // Update the user's type
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { type: newType },
            { new: true } // This option returns the modified document
        );

        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error(error);
    }
};

export const getAllUsers = async () => {
    try {
        await dbConnect();
        return await User.find({}, '-password');
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Unable to fetch users");
    }
};

export const getUserData = async (id) => {
    try {
        await dbConnect();
        const user = await User.findById(id).lean();
        if (!user) {
            throw new Error("User not found");
        }
        delete user.password;
        return user;
    } catch (error) {
        console.error("Error fetching user:", error.message);
        throw new Error("Unable to fetch user");
    }
};

export const updateUser = async (id, oldPassword, newPassword, name, email) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        if (oldPassword && newPassword) {
            if (await bcryptjs.compare(oldPassword, user.password)) {
                const salt = await bcryptjs.genSalt(10);
                user.password = await bcryptjs.hash(newPassword, salt);
            } else {
                throw new Error('Passwords don\'t match!');
            }
        } else if (name) {
            user.name = name;
        } else if (email) {
            user.email = email;
        } else {
            throw new Error('Invalid request');
        }

        return await user.save();
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(`Error: ${error}`);
    }
};
