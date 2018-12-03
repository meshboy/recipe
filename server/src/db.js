import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

export const connect = ()=> {
    return mongoose.connect(process.env.MONGO_URI, {
        useMongoClient: true
    })
}