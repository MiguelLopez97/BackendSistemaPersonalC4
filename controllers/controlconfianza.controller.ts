import { Request, Response } from "express";
import controlconfianza from '../models/controlconfianza.model';

export const getAllControlConfianza = async ( request: Request, response: Response) => {

  const ControlConfianza = await controlconfianza.findAll();
  response.json({
    data: ControlConfianza,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getControlConfianzaById = async (request: Request, response: Response) => {

  const idControlConfianza = Number(request.params.idControlConfianza);

  if (isNaN(idControlConfianza))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idControlConfianza no es un valor válido'
    });
  }

  const Controlconfianza = await controlconfianza.findByPk(idControlConfianza);
  
  if (Controlconfianza)
  {
    response.json({
      data: Controlconfianza,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: Controlconfianza,
      success: false,
      message: 'No existe registro con el id ' + Controlconfianza
    });
  }
}

//Crea el control confianza
export const createControlConfianza = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const ControlConfianza = controlconfianza.build(body);
    await ControlConfianza.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = ControlConfianza;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idControlConfianza: resultCreate.null,
      fk_idEmpleado: resultCreate.fk_idEmpleado,
      fecha: resultCreate.fecha,
      resultadp: resultCreate.resultado,
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

export const updateControlConfianza = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idControlConfianza'
    if (!body.idControlConfianza)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idDepartamento es requerido'
      });
    }

    const ControlConfianza = await controlconfianza.findByPk(body.idControlConfianza);

    //Si no existe registro del idDepartamento proporcionado
    if (!ControlConfianza)
    {
      return response.status(404).json({
        data: ControlConfianza,
        success: false,
        message: 'No existe registro con el id ' + body.idDepartamento
      });
    }

    await ControlConfianza.update(body);

    response.json({
      data: ControlConfianza,
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

export const updateEstatusControlConfianza = async (request: Request, response: Response) => {

  const idControlConfianza = Number(request.params.idControlConfianza);
  const estatus = request.query.estatus;

  // const body = request.body;
  // const estatus = body.estatus;

  if (isNaN(idControlConfianza))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idDepartamento no es un valor válido'
    });
  }

  const ControlConfianza = await controlconfianza.findByPk(idControlConfianza);

  if (!ControlConfianza)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idControlConfianza
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
    ControlConfianza.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    ControlConfianza.update({ estatus: true });
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
    data: ControlConfianza,
    success: true,
    message: 'Estatus actualizado correctamente'
  });
}

// export const disableDepartamento = async (request: Request, response: Response) => {
//   const idDepartamento = Number(request.params.idDepartamento);

//   if (isNaN(idDepartamento))
//   {
//     return response.status(500).json({
//       data: null,
//       success: false,
//       message: 'El idDepartamento no es un valor válido'
//     });
//   }

//   const departamento = await Departamento.findByPk(idDepartamento);

//   if (!departamento)
//   {
//     return response.status(404).json({
//       data: null,
//       success: false,
//       message: 'No existe registro con el id ' + idDepartamento
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   departamento.update({ estatus: false });

//   response.json({
//     data: departamento,
//     success: true,
//     message: 'Estatus actualizado correctamente'
//   });
// }