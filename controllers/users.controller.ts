import { Request, Response } from "express";
import users from '../models/users.model';
const jwt = require("jsonwebtoken");


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

    jwt.sign({user: await users.findByPk(idUsers)},'secretkey', ( error: Error | null, token: string) =>{
        response.json({
            user: Users,
           token : token
        })
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

  // const body = request.body;
  // const estatus = body.estatus;

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

  response.json({
    data: Users,
    success: true,
    message: 'Estatus actualizado correctamente'
  });
}