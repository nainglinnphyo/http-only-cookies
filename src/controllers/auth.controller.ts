import {Request, Response, NextFunction} from "express"
import {LoginUserInput} from "../dto/auth.dto";
import {signJwt} from "../utils/jwt";
import config from "config";
import {accessTokenCookieOptions, refreshTokenCookieOptions} from "../utils/cookies.options";

export const loginHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const {access_token, refresh_token} = await signToken(req.body)
        // Send Access Token in Cookie
        res.cookie("access_token", access_token, accessTokenCookieOptions);
        res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
        res.cookie("logged_in", true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        // Send Access Token
        res.status(200).json({
            status: "success",
            access_token,
        });
    } catch (e) {
        next(e);
    }
}

// private method
const signToken = async (user: { email: string, password: string }) => {
    // Sign the access token
    const access_token = signJwt({sub: user}, "accessTokenPrivateKey", {
        expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    });

    // Sign the refresh token
    const refresh_token = signJwt({sub: user}, "refreshTokenPrivateKey", {
        expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
    });

    // Return access token
    return {access_token, refresh_token};
};