import { Request, Response } from "express"; 
import CatalogoHorarios from '../models/catalogo-horarios.model';

export const getAllCatalogosHorarios = async (request: Request, response: Response) => {
  
  const catalogosHorarios = await CatalogoHorarios.findAll();

  response.json({
    data: catalogosHorarios,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getHorarioById = async (request: Request, response: Response) => {

  const idCatalogoHorario =  Number(request.params.idCatalogoHorario);

  if (isNaN(idCatalogoHorario))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCatalogoHorario no es un valor válido'
    });
  }

  const horario = await CatalogoHorarios.findByPk(idCatalogoHorario);

  if (horario)
  {
    response.json({
      data: horario,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: horario,
      success: false,
      message: 'No existe registro con el id ' + idCatalogoHorario
    });
  }
}

export const createHorario = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    const horario = CatalogoHorarios.build(body);
    await horario.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = horario;

    console.log(horario);

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idCatalogoHorario: resultCreate.null,
      clave: resultCreate.clave,
      descripcion: resultCreate.descripcion,
      hora_entrada: resultCreate.hora_entrada,
      hora_salida: resultCreate.hora_salida,
      cantidad_retardo: resultCreate.cantidadRetardo,
      hora_entrada2: resultCreate.hora_entrada2,
      hora_salida2: resultCreate.hora_salida2,
      fk_idTipoHorario: resultCreate.fk_idTipoHorario,
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
  catch (error: any)
  {
    response.status(500).json({
      error: error.parent.sqlMessage,
      success: false,
      message: 'Error al procesar la petición'
    });
  }
}

export const updateHorario = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idCarrera'
    if (!body.idCatalogoHorario)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idCatalogoHorario es requerido'
      });
    }

    const horario = await CatalogoHorarios.findByPk(body.idCatalogoHorario);

    //Si no existe registro del idCarrera proporcionado
    if (!horario)
    {
      return response.status(404).json({
        data: horario,
        success: false,
        message: 'No existe registro con el id ' + body.idCatalogoHorario
      });
    }

    await horario.update(body);

    response.json({
      data: horario,
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

export const updateEstatusHorario = async (request: Request, response: Response) => {

  const idCatalogoHorario = Number(request.params.idCatalogoHorario);

  const estatus = request.query.estatus;

  if (isNaN(idCatalogoHorario))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCatalogoHorario no es un valor válido'
    });
  }

  const horario = await CatalogoHorarios.findByPk(idCatalogoHorario);

  if (!horario)
  {
    return response.status(404).json({
      data: horario,
      success: false,
      message: 'No existe registro con el id ' + idCatalogoHorario
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
    horario.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    horario.update({ estatus: true });
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
    data: horario,
    success: true,
    message: 'Estatus actualizado correctamente',
  });
}

// export const disableHorario = async (request: Request, response: Response) => {

//   const idCatalogoHorario = Number(request.params.idCatalogoHorario);

//   if (isNaN(idCatalogoHorario))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idCatalogoHorario no es un valor válido'
//     });
//   }

//   const horario = await CatalogoHorarios.findByPk(idCatalogoHorario);

//   if (!horario)
//   {
//     return response.status(404).json({
//       data: horario,
//       success: false,
//       message: 'No existe registro con el id ' + idCatalogoHorario
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   await horario.update({ estatus: false });

//   response.json({
//     data: horario,
//     success: true,
//     message: 'Estatus actualizado correctamente',
//   });
// }