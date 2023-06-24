import { PerfilamientoDao } from '../database/dao'
import { sequel } from '../database'
import { CodehashClave } from '../utils/utils';

export const getZonas = async (req, res) => {
    try {
        const data = await PerfilamientoDao.getZonas();

        res.status(200).send({ data });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'La operación no se pudo concretar, favor intente más tarde.' });
    }
}

export const getPerfiles = async (req, res) => {
    try {
        const data = await PerfilamientoDao.getPerfiles();

        res.status(200).send({ data });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'La operación no se pudo concretar, favor intente más tarde.' });
    }
}

export const getUsuarios = async (req, res) => {
    try {
        const data = await PerfilamientoDao.getUsuarios();

        res.status(200).send({ data });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'La operación no se pudo concretar, favor intente más tarde.' });
    }
}

export const addUsuario = async (req, res) => {

    const transaction = await sequel.transaction()

    try {

        const { rut, nombres, apellido_paterno, apellido_materno, email, contrasena, zona, perfil } = req.body

        // Encriptada con SHA-2
        const clave = CodehashClave(contrasena)

        const addUsuario = await PerfilamientoDao.addUsuario(rut, nombres, apellido_paterno, apellido_materno, email, clave, zona, transaction);
        const relUsuarioPerfil = await PerfilamientoDao.addRelUsuarioPerfil(perfil, addUsuario[0][0].id, transaction);


        transaction.commit();

        res.status(200).send({ message: 'Usuario agregado', usuario: addUsuario });
    } catch (e) {
        transaction.rollback();

        console.log(e);
        res.status(500).send({ message: 'La operación no se pudo concretar, favor intente más tarde.' });
    }
}
