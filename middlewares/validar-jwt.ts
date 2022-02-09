import { Request, Response} from 'express';
import users from '../models/users.model';
const jwt = require('jsonwebtoken');

export const validarJWT = async (request: Request, response: Response, next: any ) =>{

    const token = request.header('x-token');

    if (!token){
        return response.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al uid
        const usuarioAutenticado = await users.findByPk(uid);

        //Verificar si el uid tiene estado true
        const estatus: any = await users.sequelize?.query("SELECT * FROM users WHERE idUser = ?", {
            replacements: [uid],
            model: users,
            mapToModel: true
          });

          if(!usuarioAutenticado){
              return response.status(401).json({
                  msg: 'Token no valido - el usuario no existe en la base de datos'
              })
          }

          if(!estatus[0].estatus){
              return response.status(401).json({
                  msg: 'Token no valido-No se puede autenticar porque el estado es falso'
              })
          }

        request.usua = usuarioAutenticado;
        next();

        
    } catch (error) {
        console.log(error);
        response.status(401).json({
            msg: 'Token no valido'
        });
        
    }

}

module.exports = {
    validarJWT
}