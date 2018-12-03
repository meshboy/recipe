import { User } from './user.model'; 
import { Recipe } from '../recipe/recipe.model'; 
import { signIn, verify } from '../../modules/auth';''

const loginUser = async(root, { input }) => {
    const { email, password } = input;
    const user = await User.findOne({ email }).exec();

    const errorMsg = 'Wrong credentials. Please try again';

    if(!user) {
        throw new Error (errorMsg);
    }

    if(user.comparePassword(password)) {
        user.token = signIn({ id: user._id, email: user.email });
        return user;
    }
    else{
        throw new Error (errorMsg);
    }
};

const createUser = async (root, { input }) => {
    const existingUser = await User.findOne({ email: input.email }).exec();
    if(existingUser) {
        throw new Error('User already exist!');
    }
    const user = new User();
    const newUserInput = Object.assign(input, { password: user.generateHashPassword(input.password) });
    const createNewUser = await User.create(newUserInput);
    if(!createNewUser) {
        throw new Error('User not created successfully. Please try again');
    }
    createNewUser.token = signIn({ id: createNewUser._id, email: createNewUser.email });
    return createNewUser;
};

const getMe = (root, args, { user }, info) => {
    if(!user) {
        throw new Error('Hey!, you are not authenticated');
    }
    return User.findById(user.id).exec();
};

export const userResolvers = {
    Query: {
        getMe
    },

    Mutation: {
        createUser,
        loginUser
    },

    User: {
        recipes(user) {
           return Recipe.find({ userId: user.id }).exec()
        }
    }
}