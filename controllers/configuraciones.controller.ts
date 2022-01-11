import { Request, Response } from "express";
import configuraciones from "../models/configuraciones.model";

export const getAllConfiguraciones = async ( request: Request, response: Response) => {

  const Configuraciones = await configuraciones.findAll();
  response.json({
    data: Configuraciones,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getConfiguracionesById = async (request: Request, response: Response) => {

  const idConfiguraciones = Number(request.params.idConfiguraciones);

  if (isNaN(idConfiguraciones))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idConfiguraciones no es un valor válido'
    });
  }

  const Configuraciones = await configuraciones.findByPk(idConfiguraciones);
  
  if (Configuraciones)
  {
    response.json({
      data: Configuraciones,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: Configuraciones,
      success: false,
      message: 'No existe registro con el id ' + Configuraciones
    });
  }
}

//Crea el control confianza
export const createConfiguraciones = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const Configuraciones = configuraciones.build(body);
    await Configuraciones.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = Configuraciones;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idConfiguracion: resultCreate.null,
      urilmgLogo: resultCreate.urilmgLogo,
      cantidadRetardos: resultCreate.cantidadRetardos,
      minConsiderarRetardo: resultCreate.minConsiderarRetardo,
      vacacionesC4: resultCreate.vacacionesC4,
      vacacionesComisionados: resultCreate.vacacionesComisionados,
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

export const updateConfiguraciones = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idControlConfianza'
    if (!body.idConfiguracion)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idConfiguraciones es requerido'
      });
    }

    const Configuraciones = await configuraciones.findByPk(body.idConfiguracion);

    //Si no existe registro del configuraciones proporcionado
    if (!Configuraciones)
    {
      return response.status(404).json({
        data: Configuraciones,
        success: false,
        message: 'No existe registro con el id ' + body.idConfiguracion
      });
    }

    await Configuraciones.update(body);

    response.json({
      data: Configuraciones,
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

export const updateEstatusConfiguraciones = async (request: Request, response: Response) => {

  const idConfiguraciones = Number(request.params.idConfiguraciones);
  const estatus = request.query.estatus;

  // const body = request.body;
  // const estatus = body.estatus;

  if (isNaN(idConfiguraciones))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idConfiguracion no es un valor válido'
    });
  }

  const Configuraciones = await configuraciones.findByPk(idConfiguraciones);

  if (!Configuraciones)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idConfiguraciones
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
    Configuraciones.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    Configuraciones.update({ estatus: true });
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
    data: Configuraciones,
    success: true,
    message: 'Estatus actualizado correctamente'
  });
}