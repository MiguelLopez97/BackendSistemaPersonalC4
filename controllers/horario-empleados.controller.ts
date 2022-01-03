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