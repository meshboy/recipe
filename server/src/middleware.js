import { verify } from './api/modules/auth';

const setMiddleware = (app) => {
    app.use(async (req, res, next) => {
        try{
            const token = req.headers.authorization || '';
            const user = await verify(token);
            req.user = user;
        }
        catch(e) {
            req.user = null;
        }
        next();
    });
};

export default setMiddleware;