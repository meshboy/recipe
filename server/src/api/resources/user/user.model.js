import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'User must have a unique email address']
    },

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, {
    timestamps: true
});

userSchema.methods.generateHashPassword = function (password) {
    const saltRounds = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, saltRounds);
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

export const User = mongoose.model('User', userSchema);