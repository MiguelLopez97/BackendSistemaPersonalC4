import e, { request, Request, Response } from 'express';
import RecursoPago from '../models/recurso-pago.model';


export const getAllRecursosPagos = async (request: Request, response: Response) => {

  const recursosPagos = await RecursoPago.findAll();

  response.json({
    data: recursosPagos,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getRecursoPagoById = async (request: Request, response: Response) => {

  const idRecursoPago = Number(request.params.idRecursoPago);

  if (isNaN(idRecursoPago))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idRecursoPago no es un valor válido'
    });
  }

  const recursoPago = await RecursoPago.findByPk(idRecursoPago);

  if (recursoPago)
  {
    response.json({
      data: recursoPago,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: recursoPago,
      success: false,
      message: 'No existe registro con el id ' + idRecursoPago
    });
  }
}

export const createRecursoPago = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const recursoPago = RecursoPago.build(body);
    await recursoPago.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = recursoPago;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idRecursoPago: resultCreate.null,
      nombre: resultCreate.nombre,
      descripcion: resultCreate.descripcion,
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

export const updateRecursoPago = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idRecursoPago'
    if (!body.idRecursoPago)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idRecursoPago es requerido'
      });
    }

    const recursoPago = await RecursoPago.findByPk(body.idRecursoPago);

    //Si no existe registro del idRecursoPago proporcionado
    if (!recursoPago)
    {
      return response.status(404).json({
        data: recursoPago,
        success: false,
        message: 'No existe registro con el id ' + body.idRecursoPago
      });
    }

    await recursoPago.update(body);

    response.json({
      data: recursoPago,
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

export const updateEstatusRecursoPago = async (request: Request, response: Response) => {

  const idPuesto = Number(request.params.idPuesto);

  const estatus = request.query.estatus;

  // const body = request.body
  // const estatus = body.estatus

  if (isNaN(idPuesto))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idRecursoPago no es un valor válido'
    });
  }

  const Recursopago = await RecursoPago.findByPk(idPuesto);

  if (!Recursopago)
  {
    return response.status(404).json({
      data: Recursopago,
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
    Recursopago.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    Recursopago.update({ estatus: true });
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
    data: Recursopago,
    success:  true,
    message: 'Estatus actualizado correctamente',
  });
}

// export const disableRecursoPago = async (request: Request, response: Response) => {
//   const idRecursoPago = Number(request.params.idRecursoPago);

//   if (isNaN(idRecursoPago))
//   {
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idRecursoPago no es un valor válido'
//     });
//   }

//   const recursoPago = await RecursoPago.findByPk(idRecursoPago);

//   if (!recursoPago)
//   {
//     return response.status(404).json({
//       data: recursoPago,
//       success: false,
//       message: 'No existe registro con el id ' + idRecursoPago
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   await recursoPago.update({estatus: false});

//   response.json({
//     data: recursoPago,
//     success: true,
//     message: 'Estatus actualizado correctamente'
//   });
// }