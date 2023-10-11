import {CookieOptions} from 'express';

export const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + 1000 * 60 * 1000
    ),
    maxAge: 2000 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};