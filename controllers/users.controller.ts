import { Request, Response} from 'express';
import users from '../models/users.model';
const { generarJWT } = require('../helpers/generar-jwt');



export const getAllUsers = async ( request: Request, response: Response) => {

  const Users = await users.findAll();
  response.json({
    data: Users,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
  
}

export const getUsersById = async (request: Request, response: Response) => {

  const idUsers = Number(request.params.idUsers);

  if (isNaN(idUsers))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idUsers no es un valor válido'
    });
  }

  const Users = await users.findByPk(idUsers);
  
  if (Users)
  {

    // jwt.sign({user: await users.findByPk(idUsers)},'secretkey', ( error: Error | null, token: string) =>{
    //     response.json({
    //         user: Users,
    //       //  token : token
    //     })
    // });
    response.json({
      data: Users,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: Users,
      success: false,
      message: 'No existe registro con el id ' + Users
    });
  }
}

// //Crea el control confianza
export const createUsers = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const Users = users.build(body);
    await Users.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = Users;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idUser: resultCreate.null,
      NameUser: resultCreate.NameUser,
      PassUser: resultCreate.PassUser,
      UserRol: resultCreate.UserRol,
      estatus: resultCreate.estatus,
      createdAt: resultCreate.createdAt,
      updatedAt: resultCreate.updatedAt
    };

    response.json({
      data: dataCreated,
      success: true,
      message: 'Datos guardados correctamente'
    });
  }
  catch (error)
  {
    response.status(500).json({
      error: error,
      success: false,
      message: 'Error al procesar la petición'
    });
  }
}

export const updateUsers = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idControlConfianza'
    if (!body.idUser)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idDepartamento es requerido'
      });
    }

    const Users = await users.findByPk(body.idUser);

    //Si no existe registro del idDepartamento proporcionado
    
    if (!Users)
    {
      return response.status(404).json({
        data: Users,
        success: false,
        message: 'No existe registro con el id ' + body.idUser
      });
    }

    await Users.update(body);

    response.json({
      data: Users,
      success: true,
      message: 'Datos actualizados correctamente'
    });
  }
  catch (error)
  {
    response.status(500).json({
      error: error,
      success: false,
      message: 'Error al procesar la petición'
    });
  }
}


export const updateEstatusUsers = async (request: Request, response: Response) => {

 
  const idUsers = Number(request.params.idUsers);
  const estatus = request.query.estatus;
  const UsuarioAuten = request.usua; // aquí llamamos al usuario que se logueo

  if (isNaN(idUsers))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idUsers no es un valor válido'
    });
  }

  const Users = await users.findByPk(idUsers);

  if (!Users)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idUsers
    });
  }

  if (estatus == undefined)
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El valor del estatus es requerido (true o false)'
    });
  }

  //Habilitar o deshabilitar un registro (Update estatus)
  if (estatus == 'true')
  {
    //Si el estatus viene con valor 'true' deshabilita el registro
    Users.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    Users.update({ estatus: true });
  }
  else
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El valor del estatus no es válido (true o false)'
    });
  }

  //Definimos que informacion aparecera del usuario Autenticado que esta solicitando la peticion.

  const resultUsuarioAutenticado = {
    idUser: UsuarioAuten.dataValues.idUser,
    NameUser: UsuarioAuten.dataValues.NameUser,
    UserRol: UsuarioAuten.dataValues.UserRol,
    estatus: UsuarioAuten.dataValues.estatus
  };


  response.json({
    data: Users,
    success: true,
    message: 'Estatus actualizado correctamente',
    UsuarioAutenticado: resultUsuarioAutenticado
  });
}

export const ValidacionUsers = async (request: Request, response: Response) => {

  // const idUsers = Number(request.params.idUsers); //En caso de que sea por Parametro URL 
  const body = request.body; // Respuesta que trae el cuerpo 

  //Pasaremos a crear las validaciones 
  try {
  
    //verificar si el usuario existe
    const usuario: any = await users.findByPk(body.idUser);
    if(!usuario){
      return response.status(400).json({
        msg: "Usuario con id no existe en la base de datos"
      })
    }

    //si el nombre del usuario concuerda
    // const NameUser = body.NameUser;
    // const usuario = await users.findOne({ where: {NameUser}});
    // console.log("Prueba", NameUser);
    // if(!usuario){
    //   return response.status(400).json({
    //     msg: "Nombre de Usuario no es identificado"
    //   })
    // }

  //El estatus es true o false
  if(!usuario.dataValues.estatus) {
    return response.status(400).json({
      msg: "El Usuario esta dado de baja"
    })
  }

  //Validar que usuario y contraseña sean lo mismo
  const PasswordBody = body.PassUser; // es el password que trae en el cuerpo de la respuesta.
  // console.log(PasswordBody, Usuario[0].PassUser); // muestra las dos contraseñas de ambas personas
  if(PasswordBody != usuario.dataValues.PassUser){ //Si la contraseña que mandamos es igual a la contraseña del usuaria en la base de datos
    return response.status(400).json({
      msg: "No son la mismas contraseñas de acorde al Usuario"
    })
  }

  //JWT generar para poder loguearse
  const token = await generarJWT(usuario.dataValues.idUser);

  const dataResult = {
    idUsuario: usuario.dataValues.idUser,
    fullName: usuario.dataValues.NameUser,
    rol: usuario.dataValues.UserRol,
    estatus: usuario.dataValues.estatus,
    createdAt: usuario.dataValues.createdAt,
    updatedAt: usuario.dataValues.updatedAt,
    token: token
  };


    response.json({ 
      data: dataResult,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  } catch (error) {
    console.log(error)
    return response.status(500).json({
      msg: 'Hable con el Administrador'
    });
  }

}
//AQUI ERA ERA UNA FUNCION DE LLAVE PARA VALIDAR CIERTOS CAMPOS
// export const validarCampos = async (request: Request, response: Response, next:any) => {

//   // const idUsers = Number(request.params.idUsers);
//   // const NameUser = request.query.NameUser;
//   // const PassUser = request.query.PassUser;

//    const body = request.body;
//    const idUser = body.idUser;

//    console.log("IdUsuario", idUser);
//   // const estatus = body.estatus;
//   const errors = validationResult(request);
//     if( !errors.isEmpty() ){
//         return response.status(400).json(errors);
//     }

//     next();

// }