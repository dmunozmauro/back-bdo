const SHA2 = require("sha2");

export const CodehashClave = (clave) => {

    const shaPass = Buffer.from(SHA2["SHA-224"](clave)).toString('base64');

    return shaPass;

}