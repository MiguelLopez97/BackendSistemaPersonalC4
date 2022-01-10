import { Request, Response } from 'express';
import Puesto from '../models/puesto.model';

export const getAllPuestos = async (request: Request, response: Response) => {

  const puestos = await Puesto.findAll();

  response.json({
    data: puestos,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getPuestoById = async (request: Request, response: Response) => {

  const idPuesto = Number(request.params.idPuesto);

  if (isNaN(idPuesto))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idPuesto no es un valor válido'
    });
  }

  const puesto = await Puesto.findByPk(idPuesto);

  if (puesto)
  {
    response.json({
      data: puesto,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      idPuesto,
      data: puesto,
      success: false,
      message: 'No existe registro con el id ' + idPuesto
    });
  }
}

export const createPuesto = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    const puesto = Puesto.build(body);
    await puesto.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = puesto;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idPuesto: resultCreate.null,
      clave: resultCreate.clave,
      nombre: resultCreate.nombre,
      descripcion: resultCreate.descripcion,
      idDepartamento: resultCreate.fk_idDepartamento,
      estatus: resultCreate.estatus,
      createdAt: resultCreate.createdAt,
      updatedAt: resultCreate.updatedAt
    };

    response.json({
      resultado: resultCreate,
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

export const updatePuesto = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idPuesto'
    if (!body.idPuesto)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idPuesto es requerido'
      });
    }

    const puesto = await Puesto.findByPk(body.idPuesto);

    //Si no existe registro del idPuesto proporcionado
    if (!puesto)
    {
      return response.status(404).json({
        data: puesto,
        success: false,
        message: 'No existe registro con el id ' + body.idPuesto
      });
    }

    await puesto.update(body);

    response.json({
      data: puesto,
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


export const updateEstatusPuesto = async (request: Request, response: Response) => {

  const idPuesto = Number(request.params.idPuesto);

  const estatus = request.query.estatus;

  // const body = request.body
  // const estatus = body.estatus

  if (isNaN(idPuesto))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idPuesto no es un valor válido'
    });
  }

  const puesto = await Puesto.findByPk(idPuesto);

  if (!puesto)
  {
    return response.status(404).json({
      data: puesto,
      success: false,
      message: 'No existe registro con el id ' + idPuesto
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
    puesto.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    puesto.update({ estatus: true });
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
    data: puesto,
    success:  true,
    message: 'Estatus actualizado correctamente',
  });
}

// export const disablePuesto = async (request: Request, response: Response) => {

//   const idPuesto = Number(request.params.idPuesto);

//   if (isNaN(idPuesto))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idPuesto no es un valor válido'
//     });
//   }

//   const puesto = await Puesto.findByPk(idPuesto);

//   if (!puesto)
//   {
//     return response.status(404).json({
//       data: puesto,
//       success: false,
//       message: 'No existe registro con el id ' + idPuesto
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   await puesto.update({ estatus: false });

//   response.json({
//     data: puesto,
//     success:  true,
//     message: 'Estatus actualizado correctamente',
//   });
// }