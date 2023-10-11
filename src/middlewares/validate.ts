import {NextFunction, Request, Response} from 'express';
import {AnyZodObject, ZodError} from 'zod';

export const validate = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse({
            params: req.params,
            query: req.query,
            body: req.body,
        });

        return next(); // Add a return statement here
    } catch (err: any) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                status: 'fail',
                error: err.errors,
            });
        } else {
            return next(err); // Add a return statement here
        }
    }
};
