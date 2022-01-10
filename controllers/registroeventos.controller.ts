import { Request, Response } from "express";
import registroeventos from '../models/registroeventos.model';

export const getAllRegistroEventos = async ( request: Request, response: Response) => {

  const RegistroEventos = await registroeventos.findAll();
  response.json({
    data: RegistroEventos,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getRegistroEventosById = async (request: Request, response: Response) => {

  const idRegistroEventos = Number(request.params.idRegistroEventos);

  if (isNaN(idRegistroEventos))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idRegistroEventos no es un valor válido'
    });
  }

  const RegistroEventos = await registroeventos.findByPk(idRegistroEventos);
  
  if (RegistroEventos)
  {
    response.json({
      data: RegistroEventos,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: RegistroEventos,
      success: false,
      message: 'No existe registro con el id ' + RegistroEventos
    });
  }
}

//Crea el Registro de Eventos
export const createRegistroEventos = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const RegistroEventos = registroeventos.build(body);
    await RegistroEventos.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = RegistroEventos;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idRegistroEvento: resultCreate.null,
      fk_idEvento: resultCreate.fk_idEvento,
      fk_idEmpleado: resultCreate.fk_idEmpleado,
      justificacion: resultCreate.justificacion,
      uriDocumento: resultCreate.uriDocumento,
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

export const updateRegistroEventos = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idRegistroEventos'
    if (!body.idRegistroEvento)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idRegistroEvento es requerido'
      });
    }

    const RegistroEventos = await registroeventos.findByPk(body.idRegistroEvento);

    //Si no existe registro del idDepartamento proporcionado
    if (!RegistroEventos)
    {
      return response.status(404).json({
        data: RegistroEventos,
        success: false,
        message: 'No existe registro con el id ' + body.idRegistroEvento
      });
    }

    await RegistroEventos.update(body);

    response.json({
      data: RegistroEventos,
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
export const updateEstatusRegistroEventos = async (request: Request, response: Response) => {

  const idRegistroEventos = Number(request.params.idRegistroEventos);
  const estatus = request.query.estatus;


  // const body = request.body;
  // const estatus = body.estatus;

  if (isNaN(idRegistroEventos))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idRegistroEventos no es un valor válido'
    });
  }

  const RegistroEventos = await registroeventos.findByPk(idRegistroEventos);

  if (!RegistroEventos)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idRegistroEventos
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
    RegistroEventos.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    RegistroEventos.update({ estatus: true });
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
    data: RegistroEventos,
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