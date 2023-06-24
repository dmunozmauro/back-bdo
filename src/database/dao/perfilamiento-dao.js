import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const getZonas = async () => {
    let query = `select * from per_cal_zona`;

    return await sequel.query(query, {
        type: QueryTypes.SELECT
    });
}

export const getPerfiles = async () => {
    let query = `select * from per_tal_perfiles`;

    return await sequel.query(query, {
        type: QueryTypes.SELECT
    });
}

export const getUsuarios = async () => {
    let query = `select 
                    ptu.id as id_usuario,
                    ptu.rut,
                    ptu.nombres,
                    ptu.apellido_paterno,
                    ptu.apellido_materno,
                    ptu.email,
                    ptu.contrasena,
                    pcz.descripcion as zona,
                    ptp.nombre as perfil
                from per_tal_usuarios ptu 
                    inner join per_cal_zona pcz on pcz.id = ptu.id_zona 
                    inner join per_rel_perfil_usuario prpu on prpu.id_usuario = ptu.id
                    inner join per_tal_perfiles ptp on ptp.id = prpu.id_perfil`;

    return await sequel.query(query, {
        type: QueryTypes.SELECT
    });
}

export const addUsuario = async (rut, nombres, apellido_paterno, apellido_materno, email, clave, zona, t) => {
    const query = `insert into per_tal_usuarios(
                        rut, 
                        nombres,
                        apellido_paterno,
                        apellido_materno,
                        email,
                        contrasena,
                        id_zona)
            output inserted.id          
            values ($1, $2, $3, $4, $5, $6, $7)`

    return sequel.query(query, {
        bind: [rut, nombres, apellido_paterno, apellido_materno, email, clave, zona],
        type: QueryTypes.INSERT,
        transaction: t
    });
}

export const addRelUsuarioPerfil = async (perfil, idUsuario, t) => {
    const query = `insert into per_rel_perfil_usuario(
                        id_perfil, 
                        id_usuario)
            output inserted.id          
            values ($1, $2)`

    return sequel.query(query, {
        bind: [perfil, idUsuario],
        type: QueryTypes.INSERT,
        transaction: t
    });
}