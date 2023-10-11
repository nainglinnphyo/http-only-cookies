import config from "config";
import jwt, {SignOptions} from "jsonwebtoken";

export const signJwt = (
    payload: Object,
    key: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options: SignOptions = {}
) => {
    // const privateKey = Buffer.from(config.get<string>(key), "base64").toString(
    //     "ascii"
    // );
    //
    // console.log(privateKey)
    return jwt.sign(payload, config.get<string>(key), {
        ...(options && options),
        algorithm: "RS256",

    });
};

export const verifyJwt = <T>(
    token: string,
    key: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
    try {
        const publicKey = Buffer.from(config.get<string>(key), "base64").toString(
            "ascii"
        );
        return jwt.verify(token, publicKey) as T;
    } catch (error) {
        return null;
    }
};