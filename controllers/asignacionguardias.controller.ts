import { Request, Response } from "express";
import asignacionguardias from '../models/asignacionguardias.model';

export const getAllAsignacionGuardias = async ( request: Request, response: Response) => {

  const AsignacionGuardias = await asignacionguardias.findAll();
  response.json({
    data: AsignacionGuardias,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getAsignacionGuardiasById = async (request: Request, response: Response) => {

  const idAsignacionGuardias = Number(request.params.idAsignacionGuardias);

  if (isNaN(idAsignacionGuardias))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idAsignacionGuardias no es un valor válido'
    });
  }

  const AsignacionGuardias = await asignacionguardias.findByPk(idAsignacionGuardias);
  
  if (AsignacionGuardias)
  {
    response.json({
      data: AsignacionGuardias,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: AsignacionGuardias,
      success: false,
      message: 'No existe registro con el id ' + AsignacionGuardias
    });
  }
}

//Crea el control confianza
export const createAsignacionGuardias = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const AsignacionGuardias = asignacionguardias.build(body);
    await AsignacionGuardias.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = AsignacionGuardias;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idAsignacionGuardia: resultCreate.null,
      fk_idEmpleado: resultCreate.fk_idEmpleado,
      fk_idGuardia: resultCreate.idGuardia,
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

export const updateAsignacionGuardias = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idControlConfianza'
    if (!body.idAsignacionGuardia)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idAsignacionGuardia es requerido'
      });
    }

    const AsignacionGuardias = await asignacionguardias.findByPk(body.idAsignacionGuardia);

    //Si no existe registro del idDepartamento proporcionado
    if (!AsignacionGuardias)
    {
      return response.status(404).json({
        data: AsignacionGuardias,
        success: false,
        message: 'No existe registro con el id ' + body.idAsignacionGuardia
      });
    }

    await AsignacionGuardias.update(body);

    response.json({
      data: AsignacionGuardias,
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

export const updateEstatusAsignacionGuardias = async (request: Request, response: Response) => {

  const idAsignacionGuardias = Number(request.params.idAsignacionGuardias);

  const estatus = request.query.estatus;

  if (isNaN(idAsignacionGuardias))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idAsignacionGuardias no es un valor válido'
    });
  }

  const AsignacionGuardias = await asignacionguardias.findByPk(idAsignacionGuardias);

  if (!AsignacionGuardias)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idAsignacionGuardias
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
    AsignacionGuardias.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    AsignacionGuardias.update({ estatus: true });
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
    data: AsignacionGuardias,
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