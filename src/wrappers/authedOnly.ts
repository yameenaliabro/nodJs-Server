import { RequestHandlerWrapper } from '.';
import { ApiError } from '../helpers';



const authedOnly: RequestHandlerWrapper = (handler) => async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')?.[1];
        if (!token) throw new ApiError(401, 'Unauthorized!');
        await handler(req, res, next);
    } catch (error) {
        next?.(error);
    }
};

export default authedOnly;