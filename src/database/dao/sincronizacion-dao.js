import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const getObtenerData = async () => {
    let query = `select * from pro_cal_configuracion`;

    return await sequel.query(query, {
        type: QueryTypes.SELECT
    });
}