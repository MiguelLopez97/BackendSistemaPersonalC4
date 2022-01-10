import { Request, Response } from "express";
import tiposguardias from '../models/tiposguardias.model';

export const getAllTiposGuardias = async ( request: Request, response: Response) => {

  const TiposGuardias = await tiposguardias.findAll();
  response.json({
    data: TiposGuardias,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getTiposGuardiasById = async (request: Request, response: Response) => {

  const idTiposGuardias = Number(request.params.idTiposGuardias);

  if (isNaN(idTiposGuardias))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idTiposGuardias no es un valor válido'
    });
  }

  const TiposGuardias = await tiposguardias.findByPk(idTiposGuardias);
  
  if (TiposGuardias)
  {
    response.json({
      data: TiposGuardias,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: TiposGuardias,
      success: false,
      message: 'No existe registro con el id ' + TiposGuardias
    });
  }
}

//Crea el Tipo de Guardia
export const createTiposGuardias = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const TiposGuardias = tiposguardias.build(body);
    await TiposGuardias.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = TiposGuardias;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idTipoGuardia: resultCreate.null,
      clave: resultCreate.clave,
      descripcion: resultCreate.descripcion,
      cantidadGuardias: resultCreate.cantidadGuardias,
      diasDescanso: resultCreate.diasDescanso,
      cantidadTurnos: resultCreate.cantidadTurnos,
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

export const updateTiposGuardias = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'Tipo de Guardia'
    if (!body.idTipoGuardia)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idDepartamento es requerido'
      });
    }

    const TiposGuardias = await tiposguardias.findByPk(body.idTipoGuardia);

    //Si no existe registro del idDepartamento proporcionado
    if (!TiposGuardias)
    {
      return response.status(404).json({
        data: TiposGuardias,
        success: false,
        message: 'No existe registro con el id ' + body.idTipoGuardia
      });
    }

    await TiposGuardias.update(body);

    response.json({
      data: TiposGuardias,
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

export const updateEstatusTiposGuardias = async (request: Request, response: Response) => {

  const idTiposGuardias = Number(request.params.idTiposGuardias);

  const estatus = request.query.estatus;

  if (isNaN(idTiposGuardias))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idTipoGuardia no es un valor válido'
    });
  }

  const TiposGuardias = await tiposguardias.findByPk(idTiposGuardias);

  if (!TiposGuardias)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idTiposGuardias
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
    TiposGuardias.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    TiposGuardias.update({ estatus: true });
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
    data: TiposGuardias,
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