import { Request, Response } from "express";
import Corporacion from '../models/corporacion.model';

export const getAllCorporaciones = async (request: Request, response: Response) =>
{
  const corporaciones = await Corporacion.findAll();

  response.json({
    data: corporaciones,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getCorporacionById = async (request: Request, response: Response) => {

  const idCorporacion =  Number(request.params.idCorporacion);

  if (isNaN(idCorporacion))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCorporacion no es un valor válido'
    });
  }

  const corporacion = await Corporacion.findByPk(idCorporacion);

  if (corporacion)
  {
    response.json({
      data: corporacion,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      idCorporacion,
      data: corporacion,
      success: false,
      message: 'No existe registro con el id ' + idCorporacion
    });
  }
}

export const createCorporacion = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    const corporacion = Corporacion.build(body);
    await corporacion.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = corporacion;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idCorporacion: resultCreate.null,
      nombre: resultCreate.nombre,
      siglas: resultCreate.siglas,
      direccion: resultCreate.direccion,
      telefono: resultCreate.telefono,
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

export const updateCorporacion = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idCorporacion'
    if (!body.idCorporacion)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idCorporacion es requerido'
      });
    }

    const corporacion = await Corporacion.findByPk(body.idCorporacion);

    //Si no existe registro del idCorporacion proporcionado
    if (!corporacion)
    {
      return response.status(404).json({
        data: corporacion,
        success: false,
        message: 'No existe registro con el id ' + body.idCorporacion
      });
    }

    await corporacion.update(body);

    response.json({
      data: corporacion,
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

export const updateEstatusCorporacion = async (request: Request, response: Response) => {

  const idCorporacion = Number(request.params.idCorporacion);

  const estatus = request.query.estatus;

  if (isNaN(idCorporacion))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCorporacion no es un valor válido'
    });
  }

  const corporacion = await Corporacion.findByPk(idCorporacion);

  if (!corporacion)
  {
    return response.status(404).json({
      data: corporacion,
      success: false,
      message: 'No existe registro con el id ' + idCorporacion
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
    corporacion.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    corporacion.update({ estatus: true });
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
    data: corporacion,
    success:  true,
    message: 'Estatus actualizado correctamente',
  });
}

// export const disableCorporacion = async (request: Request, response: Response) => {

//   const idCorporacion = Number(request.params.idCorporacion);

//   if (isNaN(idCorporacion))
//   {
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idCorporacion no es un valor válido'
//     });
//   }

//   const corporacion = await Corporacion.findByPk(idCorporacion);

//   if (!corporacion)
//   {
//     return response.status(404).json({
//       data: corporacion,
//       success: false,
//       message: 'No existe registro con el id ' + idCorporacion
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   await corporacion.update({ estatus: false });

//   response.json({
//     data: corporacion,
//     success:  true,
//     message: 'Estatus actualizado correctamente',
//   });
// }