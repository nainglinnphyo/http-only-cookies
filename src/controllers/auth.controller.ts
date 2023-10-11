import {Request, Response, NextFunction} from "express"
import {LoginUserInput} from "../dto/auth.dto";

export const loginHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
    return req.body
}