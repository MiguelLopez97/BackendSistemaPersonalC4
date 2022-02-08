import { Request, Response } from 'express';
import HorarioEmpleados from "../models/horario-empleado.model";

export const getAllHorariosEmpleados = async (request: Request, response: Response) => {

  const horariosEmpleados = await HorarioEmpleados.findAll();

  response.json({
    data: horariosEmpleados,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getHorarioEmpleadoById = async (request: Request, response: Response) => {
  
  const idHorarioEmpleado = Number(request.params.idHorarioEmpleado);

  if (isNaN(idHorarioEmpleado))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idHorarioEmpleado no es un valor válido'
    });
  }

  const horariosEmpleado = await HorarioEmpleados.findByPk(idHorarioEmpleado);

  if (horariosEmpleado)
  {
    response.json({
      data: horariosEmpleado,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      idHorarioEmpleado,
      data: horariosEmpleado,
      success: false,
      message: 'No existe registro con el id ' + idHorarioEmpleado
    });
  }
}

export const getHorariosByEmpleadoByIdEmpleado = async (request: Request, response: Response) => {
  
  const idEmpleado = Number(request.params.idEmpleado);

  if (isNaN(idEmpleado))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idEmpleado no es un valor válido'
    });
  }

  // const horariosEmpleado = await HorarioEmpleados.findByPk(idHorarioEmpleado);

  const horariosEmpleado = await HorarioEmpleados.sequelize?.query("SELECT * FROM horariosempleados WHERE fk_idEmpleado = ?", {
    replacements: [idEmpleado],
    model: HorarioEmpleados,
    mapToModel: true
  });

  if (horariosEmpleado)
  {
    response.json({
      data: horariosEmpleado,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      idEmpleado,
      data: horariosEmpleado,
      success: false,
      message: 'No existe registro con el id ' + idEmpleado
    });
  }
}

export const createHorarioEmpleado = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    const horarioEmpleado = HorarioEmpleados.build(body);
    await horarioEmpleado.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = horarioEmpleado;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idHorarioEmpleado: resultCreate.null,
      fk_idEmpleado: resultCreate.fk_idEmpleado,
      mes: resultCreate.mes,
      anio: resultCreate.anio,
      datosHorario: resultCreate.datosHorario,
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

export const updateHorarioEmpleado = async (request: Request, response: Response) => {

  const body = request.body;

  try
  {
    //Si en el body del response no viene el 'idHorarioEmpleado'
    if (!body.idHorarioEmpleado)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idHorarioEmpleado es requerido'
      });
    }

    const horarioEmpleado = await HorarioEmpleados.findByPk(body.idHorarioEmpleado);

    //Si no existe registro del idHorarioEmpleado proporcionado
    if (!horarioEmpleado)
    {
      return response.status(404).json({
        data: horarioEmpleado,
        success: false,
        message: 'No existe registro con el id ' + body.idHorarioEmpleado
      });
    }

    await horarioEmpleado.update(body);

    response.json({
      data: horarioEmpleado,
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

export const updateEstatusHorarioEmpleado = async (request: Request, response: Response) => {

  const idHorarioEmpleado = Number(request.params.idHorarioEmpleado);

  const estatus = request.query.estatus;

  // const body = request.body
  // const estatus = body.estatus

  if (isNaN(idHorarioEmpleado))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idHorarioEmpleado no es un valor válido'
    });
  }

  const horarioEmpleado = await HorarioEmpleados.findByPk(idHorarioEmpleado);

  if (!horarioEmpleado)
  {
    return response.status(404).json({
      data: horarioEmpleado,
      success: false,
      message: 'No existe registro con el id ' + idHorarioEmpleado
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
    horarioEmpleado.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    horarioEmpleado.update({ estatus: true });
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
    data: horarioEmpleado,
    success:  true,
    message: 'Estatus actualizado correctamente',
  });
}