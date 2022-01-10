import { Request, Response } from "express"; 
import GradoAcademico from '../models/grado-academico.model';

export const getAllGradosAcademicos = async (request: Request, response: Response) => {
  const gradosAcademicos = await GradoAcademico.findAll();
  
  response.json({
    data: gradosAcademicos,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getGradoAcademicoById = async (request: Request, response: Response) => {

  const idGradoAcademico =  Number(request.params.idGradoAcademico);

  if (isNaN(idGradoAcademico))
  { 
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idGradoAcademico no es un valor válido'
    });
  }

  const gradoAcademico = await GradoAcademico.findByPk(idGradoAcademico);

  if (gradoAcademico)
  {
    response.json({
      data: gradoAcademico,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: gradoAcademico,
      success: false,
      message: 'No existe registro con el id ' + idGradoAcademico
    });
  }
}

export const createGradoAcademico = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    const gradoAcademico = GradoAcademico.build(body);
    await gradoAcademico.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = gradoAcademico;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idGradoAcademico: resultCreate.null,
      nombre: resultCreate.nombre,
      abreviatura: resultCreate.abreviatura,
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

export const updateGradoAcademico = async (request: Request, response: Response) => {

  const body = request.body;

  try
  {
    //Si en el body del response no viene el 'idGradoAcademico'
    if (!body.idGradoAcademico)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idGradoAcademico es requerido'
      });
    }

    const gradoAcademico = await GradoAcademico.findByPk(body.idGradoAcademico);

    //Si no existe registro del idGradoAcademico proporcionado
    if (!gradoAcademico)
    {
      return response.status(404).json({
        data: gradoAcademico,
        success: false,
        message: 'No existe registro con el id ' + body.idGradoAcademico
      });
    }

    await gradoAcademico.update(body);

    response.json({
      data: gradoAcademico,
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

export const updateEstatusGradosAcademicos = async (request: Request, response: Response) => {

  const idGradoAcademico = Number(request.params.idGradoAcademico);
  const estatus = request.query.estatus
  // const body = request.body;
  // const estatus = body.estatus;

  if (isNaN(idGradoAcademico))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idGradoAcademico no es un valor válido'
    });
  }

  const Gradoacademico = await GradoAcademico.findByPk(idGradoAcademico);

  if (!Gradoacademico)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idGradoAcademico
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
    Gradoacademico.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    Gradoacademico.update({ estatus: true });
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
    data: Gradoacademico,
    success: true,
    message: 'Estatus actualizado correctamente'
  });
}

// export const disableGradoAcademico = async (request: Request, response: Response) => {

//   const idGradoAcademico = Number(request.params.idGradoAcademico);

//   if (isNaN(idGradoAcademico))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idGradoAcademico no es un valor válido'
//     });
//   }

//   const gradoAcademico = await GradoAcademico.findByPk(idGradoAcademico);

//   if (!gradoAcademico)
//   {
//     return response.status(404).json({
//       data: gradoAcademico,
//       success: false,
//       message: 'No existe registro con el id ' + idGradoAcademico
//     });
//   }

//   //Para dar baja lógica a un registro (Update estatus)
//   await gradoAcademico.update({ estatus: false });

//   response.json({
//     data: gradoAcademico,
//     success: true,
//     message: 'Estatus actualizado correctamente',
//   });
// }