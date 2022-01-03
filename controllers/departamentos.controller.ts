import { request, Request, Response } from "express";
import Departamento from '../models/departamento.model';

export const getAllDepartamentos = async (request: Request, response: Response) => {
  const departamentos = await Departamento.findAll();

  response.json({
    data: departamentos,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getDepartamentoById = async (request: Request, response: Response) => {

  const idDepartamento = Number(request.params.idDepartamento);

  if (isNaN(idDepartamento))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idDepartamento no es un valor válido'
    });
  }

  const departamento = await Departamento.findByPk(idDepartamento);
  
  if (departamento)
  {
    response.json({
      data: departamento,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: departamento,
      success: false,
      message: 'No existe registro con el id ' + idDepartamento
    });
  }
}

export const createDepartamento = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const departamento = Departamento.build(body);
    await departamento.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = departamento;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idDepartamento: resultCreate.null,
      nombre: resultCreate.nombre,
      claveDepartamento: resultCreate.claveDepartamento,
      descripcion: resultCreate.descripcion,
      extensionTelefono: resultCreate.extensionTelefono,
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

export const updateDepartamento = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idDepartamento'
    if (!body.idDepartamento)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idDepartamento es requerido'
      });
    }

    const departamento = await Departamento.findByPk(body.idDepartamento);

    //Si no existe registro del idDepartamento proporcionado
    if (!departamento)
    {
      return response.status(404).json({
        data: departamento,
        success: false,
        message: 'No existe registro con el id ' + body.idDepartamento
      });
    }

    await departamento.update(body);

    response.json({
      data: departamento,
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

export const updateEstatusDepartamento = async (request: Request, response: Response) => {

  const idDepartamento = Number(request.params.idDepartamento);

  const estatus = request.query.estatus;

  if (isNaN(idDepartamento))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idDepartamento no es un valor válido'
    });
  }

  const departamento = await Departamento.findByPk(idDepartamento);

  if (!departamento)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idDepartamento
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
    departamento.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    departamento.update({ estatus: true });
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
    data: departamento,
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