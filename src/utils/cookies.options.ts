import config from "config";
import {CookieOptions} from "express";

export const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
    ),
    maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};

export const refreshTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>("refreshTokenExpiresIn") * 60 * 1000
    ),
    maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};