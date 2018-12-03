import jsonwebtoken from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET;
const expiresIn = process.env.EXPIRES_IN || '1 day';

export const signIn = payload => jsonwebtoken.sign(payload, secret, { expiresIn });

export const verify = token => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secret, {}, (err, payload) => {
            if(err){
                return reject(err);
            }
            return resolve(payload);
        })
    })
}

export const throwErrorIfUserNotAuthenticated = user => {if(!user) throw new Error('hey!. You are not authenticated')}
