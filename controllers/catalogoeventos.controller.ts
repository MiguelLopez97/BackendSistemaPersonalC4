import { Request, Response } from "express";
import catalogoeventos from '../models/catalogoeventos.model';

export const getAllCatalogoEventos = async ( request: Request, response: Response) => {

  const CatalogoEventos = await catalogoeventos.findAll();
  response.json({
    data: CatalogoEventos,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getCatalogoEventosById = async (request: Request, response: Response) => {

  const idCatalogoEventos = Number(request.params.idCatalogoEventos);

  if (isNaN(idCatalogoEventos))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCatalogoEventos no es un valor válido'
    });
  }

  const CatalogoEventos = await catalogoeventos.findByPk(idCatalogoEventos);
  
  if (CatalogoEventos)
  {
    response.json({
      data: CatalogoEventos,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: CatalogoEventos,
      success: false,
      message: 'No existe registro con el id ' + CatalogoEventos
    });
  }
}

//Crea el control confianza
export const createCatalogoEventos = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const CatalogoEventos = catalogoeventos.build(body);
    await CatalogoEventos.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = CatalogoEventos;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idEvento: resultCreate.null,
      nombre: resultCreate.nombre,
      descripcion: resultCreate.descripcion,
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

export const updateCatalogoEventos = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idCatalogoConfianza'
    if (!body.idEvento)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idCatalogoEvento es requerido'
      });
    }

    const CatalogoEventos = await catalogoeventos.findByPk(body.idEvento);

    //Si no existe registro del idDepartamento proporcionado
    if (!CatalogoEventos)
    {
      return response.status(404).json({
        data: CatalogoEventos,
        success: false,
        message: 'No existe registro con el id ' + body.idDepartamento
      });
    }

    await CatalogoEventos.update(body);

    response.json({
      data: CatalogoEventos,
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

export const updateEstatusCatalogoEventos = async (request: Request, response: Response) => {

  const idCatalogoEventos = Number(request.params.idCatalogoEventos);
  const estatus = request.query.estatus;

  // const body = request.body
  // const estatus = body.estatus

  if (isNaN(idCatalogoEventos))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCatalogoEventos no es un valor válido'
    });
  }

  const CatalogoEventos = await catalogoeventos.findByPk(idCatalogoEventos);

  if (!CatalogoEventos)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idCatalogoEventos
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
    CatalogoEventos.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    CatalogoEventos.update({ estatus: true });
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
    data: CatalogoEventos,
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