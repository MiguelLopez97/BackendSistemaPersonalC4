import { Request, Response } from "express";
import Empleados from "../models/empleado.model";
const { QueryTypes } = require('sequelize');

import TallaPrenda from '../models/talla-prenda.model';

export const getAllTallasPrendas = async (request: Request, response: Response) => {

  const tallasPrendas = await TallaPrenda.findAll();

  response.json({
    data: tallasPrendas,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getTallaPrendaById = async (request: Request, response: Response) => {

  const idTallaPrenda =  Number(request.params.idTallaPrenda);

  if (isNaN(idTallaPrenda))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idTallaPrenda no es un valor válido'
    });
  }

  //Buscamos el registro de TallaPrenda por 'idTallaPrenda'
  const tallaPrenda = await TallaPrenda.findByPk(idTallaPrenda);
  const resultTallaPrenda: any = tallaPrenda;
  
  //Buscamos el registro del empleado en base al 'fk_idEmpleado' para obtener el nombre completo
  const empleado: any = await Empleados.findByPk(resultTallaPrenda.fk_idEmpleado);

  //Objeto a mandar como respuesta 
  const dataResult = {
    idTallaPrenda: resultTallaPrenda.idTallaPrenda,
    fk_idEmpleado: resultTallaPrenda.fk_idEmpleado,
    nombreEmpleado: empleado.nombre + ' ' + empleado.apPaterno + ' ' + empleado.apMaterno,
    tallaCamisa: resultTallaPrenda.tallaCamisa,
    tallaPantalon: resultTallaPrenda.tallaPantalon,
    tallaFalda: resultTallaPrenda.tallaFalda,
    tallaZapato: resultTallaPrenda.tallaZapato,
    estatus: resultTallaPrenda.estatus,
    createdAt: resultTallaPrenda.createdAt,
    updatedAt: resultTallaPrenda.updatedAt
  };

  if (tallaPrenda)
  {
    response.json({
      data: dataResult,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: tallaPrenda,
      success: false,
      message: 'No existe registro con el id ' + idTallaPrenda
    });
  }
}

export const getTallaPrendaByIdEmpleado = async (request: Request, response: Response) => {

  const idEmpleado =  Number(request.params.idEmpleado);

  if (isNaN(idEmpleado))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idEmpleado no es un valor válido'
    });
  }

  const tallaPrenda = await TallaPrenda.sequelize?.query("SELECT * FROM tallasprendas WHERE fk_idEmpleado = ?", {
    replacements: [idEmpleado],
    model: TallaPrenda,
    mapToModel: true
  });

  if (tallaPrenda?.length)
  {
    response.json({
      data: tallaPrenda[0],
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: tallaPrenda,
      success: false,
      message: 'No existe registro de tallas para el idEmpleado ' + idEmpleado
    });
  }
}

export const createTallaPrenda = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    const tallaPrenda = TallaPrenda.build(body);
    await tallaPrenda.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = tallaPrenda;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idTallaPrenda: resultCreate.null,
      fk_idEmpleado: resultCreate.fk_idEmpleado,
      tallaCamisa: resultCreate.tallaCamisa,
      tallaPantalon: resultCreate.tallaPantalon,
      tallaFalda: resultCreate.tallaFalda,
      tallaZapato: resultCreate.tallaZapato,
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

export const updateTallaPrenda = async (request: Request, response: Response) => {

  const body = request.body;

  try
  {
    //Si en el body del response no viene el 'idTallaPrenda'
    if (!body.idTallaPrenda)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idTallaPrenda es requerido'
      });
    }

    const tallaPrenda = await TallaPrenda.findByPk(body.idTallaPrenda);

    //Si no existe registro del idTallaPrenda proporcionado
    if (!tallaPrenda)
    {
      return response.status(404).json({
        data: tallaPrenda,
        success: false,
        message: 'No existe registro con el id ' + body.idTallaPrenda
      });
    }

    await tallaPrenda.update(body);

    response.json({
      data: tallaPrenda,
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

export const updateEstatusTallaPrenda = async (request: Request, response: Response) => {

   const idTallaPrenda = Number(request.params.idTallaPrenda);

  const estatus = request.query.estatus;

  // const body = request.body
  // const estatus = body.estatus

  if (isNaN(idTallaPrenda))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idTallaPrenda no es un valor válido'
    });
  }

  const Tallaprenda= await TallaPrenda.findByPk(idTallaPrenda);

  if (!Tallaprenda)
  {
    return response.status(404).json({
      data: Tallaprenda,
      success: false,
      message: 'No existe registro con el id ' + idTallaPrenda
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
    Tallaprenda.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    Tallaprenda.update({ estatus: true });
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
    data: Tallaprenda,
    success:  true,
    message: 'Estatus actualizado correctamente',
  });
}

// export const disableTallaPrenda = async (request: Request, response: Response) => {

//   const idTallaPrenda = Number(request.params.idTallaPrenda);

//   if (isNaN(idTallaPrenda))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idTallaPrenda no es un valor válido'
//     });
//   }

//   const tallaPrenda = await TallaPrenda.findByPk(idTallaPrenda);

//   if (!tallaPrenda)
//   {
//     return response.status(404).json({
//       data: tallaPrenda,
//       success: false,
//       message: 'No existe registro con el id ' + idTallaPrenda
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   await tallaPrenda.update({ estatus: false });

//   response.json({
//     data: tallaPrenda,
//     success: true,
//     message: 'Estatus actualizado correctamente',
//   });
// }