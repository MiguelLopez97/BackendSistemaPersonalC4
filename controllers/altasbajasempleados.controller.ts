import { Request, Response } from "express";
import altasbajasempleados from "../models/altasbajasempleados.model";

export const getAllAltasBajasEmpleados = async ( request: Request, response: Response) => {

  const AltasBajasEmpleados = await altasbajasempleados.findAll();
  response.json({
    data: AltasBajasEmpleados,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getAltasBajasEmpleadosById = async (request: Request, response: Response) => {

  const idAltasBajasEmpleados = Number(request.params.idAltasBajasEmpleados);

  if (isNaN(idAltasBajasEmpleados))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idAltasBajasEmpleados no es un valor válido'
    });
  }

  const AltasBajasEmpleados = await altasbajasempleados.findByPk(idAltasBajasEmpleados);
  
  if (AltasBajasEmpleados)
  {
    response.json({
      data: AltasBajasEmpleados,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: AltasBajasEmpleados,
      success: false,
      message: 'No existe registro con el id ' + AltasBajasEmpleados
    });
  }
}

//Crea el control Altas
export const createAltasBajasEmpleados = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const AltasBajasEmpleados = altasbajasempleados.build(body);
    await AltasBajasEmpleados.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = AltasBajasEmpleados;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idaltasBajasEmpleados: resultCreate.null,
      fk_idEmpleado: resultCreate.fk_idEmpleado,
      fecha: resultCreate.fecha,
      tipo: resultCreate.tipo,
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

export const updateAltasBajasEmpleados = async (request: Request, response: Response) => {

  const body =  request.body;
  console.log("Pruebaaaaaaa", body);

  try
  {
    //Si en el body del response no viene el 'idAltasBajasEmpleado'
    if (!body.idaltasBajasEmpleados)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idAltasBajasEmpleado es requerido'
      });
    }

    const AltasBajasEmpleados = await altasbajasempleados.findByPk(body.idaltasBajasEmpleados);

    //Si no existe registro del idDepartamento proporcionado
    if (!AltasBajasEmpleados)
    {
      return response.status(404).json({
        data: AltasBajasEmpleados,
        success: false,
        message: 'No existe registro con el id ' + body.altasbajasempleados
      });
    }

    await AltasBajasEmpleados.update(body);

    response.json({
      data: AltasBajasEmpleados,
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

export const updateEstatusAltasBajasEmpleados = async (request: Request, response: Response) => {

  const idAltasBajasEmpleados = Number(request.params.idAltasBajasEmpleados);

  const estatus = request.query.estatus;

  console.log("Datos", idAltasBajasEmpleados, estatus)

  // const body = request.body
  // const estatus = body.estatus

  if (isNaN(idAltasBajasEmpleados))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idEmpleado no es un valor válido'
    });
  }

  const AltasBajasEmpleados = await altasbajasempleados.findByPk(idAltasBajasEmpleados);

  if (!AltasBajasEmpleados)
  {
    return response.status(404).json({
      data: AltasBajasEmpleados,
      success: false,
      message: 'No existe registro con el id ' + AltasBajasEmpleados
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
    AltasBajasEmpleados.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    AltasBajasEmpleados.update({ estatus: true });
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
    data: AltasBajasEmpleados,
    success:  true,
    message: 'Estatus actualizado correctamente',
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