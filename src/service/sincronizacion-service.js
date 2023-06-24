import { SincronizacionDao } from '../database/dao'
import { sequel } from '../database'

const SHA2 = require("sha2");

export const getObtenerData = async (req, res) => {
    try {

        const data = await SincronizacionDao.getObtenerData();

        if (!data.length) {
            res.status(200).send({ message: 'La operación no produjo resultados' });
        }

        res.status(200).send({ message: 'OK', data });

    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'La operación no se pudo concretar, favor intente más tarde.' });
    }
}

export const CodehashClave = async (req, res) => {
    try {

        const { clave } = req.body
        const shaPass = Buffer.from(SHA2["SHA-224"](clave)).toString('base64');

        res.status(200).send({ shaPass });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'La operación no se pudo concretar, favor intente más tarde.' });
    }
}
