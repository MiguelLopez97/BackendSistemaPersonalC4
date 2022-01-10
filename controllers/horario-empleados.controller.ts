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

  const carrera = await HorarioEmpleados.findByPk(idHorarioEmpleado);

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
      idHorarioEmpleado,
      data: carrera,
      success: false,
      message: 'No existe registro con el id ' + idHorarioEmpleado
    });
  }
}