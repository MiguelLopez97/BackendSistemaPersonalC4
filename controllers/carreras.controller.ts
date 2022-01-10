import { Request, Response } from "express";
import Carrera from "../models/carrera.model";

export const getAllCarreras = async (request: Request, response: Response) => {

  const carreras = await Carrera.findAll();

  response.json({
    data: carreras,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getCarreraById = async (request: Request, response: Response) => {

  const idCarrera =  Number(request.params.idCarrera);

  if (isNaN(idCarrera))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCarrera no es un valor válido'
    });
  }

  const carrera = await Carrera.findByPk(idCarrera);

  if (carrera)
  {
    response.json({
      data: carrera,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      idCarrera,
      data: carrera,
      success: false,
      message: 'No existe registro con el id ' + idCarrera
    });
  }
}

export const createCarrera = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    const carrera = Carrera.build(body);
    await carrera.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = carrera;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idCarrera: resultCreate.null,
      nombre: resultCreate.nombre,
      siglas: resultCreate.siglas,
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

export const updateCarrera = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idCarrera'
    if (!body.idCarrera)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idCarrera es requerido'
      });
    }

    const carrera = await Carrera.findByPk(body.idCarrera);

    //Si no existe registro del idCarrera proporcionado
    if (!carrera)
    {
      return response.status(404).json({
        data: carrera,
        success: false,
        message: 'No existe registro con el id ' + body.idCarrera
      });
    }

    await carrera.update(body);

    response.json({
      data: carrera,
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

export const updateEstatusCarreras = async (request: Request, response: Response) => {

   const idCarrera = Number(request.params.idCarrera);
   const estatus = request.query.estatus
  // const body = request.body;
  // const estatus = body.estatus;

  if (isNaN(idCarrera))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCarrera no es un valor válido'
    });
  }

  const Carreras = await Carrera.findByPk(idCarrera);

  if (!Carreras)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idCarrera
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
    Carreras.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    Carreras.update({ estatus: true });
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
    data: Carreras,
    success: true,
    message: 'Estatus actualizado correctamente'
  });
}

// export const disableCarrera = async (request: Request, response: Response) => {

//   const idCarrera = Number(request.params.idCarrera);

//   if (isNaN(idCarrera))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idCarrera no es un valor válido'
//     });
//   }

//   const carrera = await Carrera.findByPk(idCarrera);

//   if (!carrera)
//   {
//     return response.status(404).json({
//       data: carrera,
//       success: false,
//       message: 'No existe registro con el id ' + idCarrera
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   await carrera.update({ estatus: false });

//   response.json({
//     data: carrera,
//     success: true,
//     message: 'Estatus actualizado correctamente',
//   });
// }