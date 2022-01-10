import { Request, Response } from "express";
import catalogoguardias from '../models/catalogoguardias.model';

export const getAllCatalogoGuardias = async ( request: Request, response: Response) => {

  const CatalogoGuardias = await catalogoguardias.findAll();
  response.json({
    data: CatalogoGuardias,
    success: true,
    message: 'Datos obtenidos correctamente'
  });
}

export const getCatalogoGuardiasById = async (request: Request, response: Response) => {

  const idCatalogoGuardias = Number(request.params.idCatalogoGuardias);

  if (isNaN(idCatalogoGuardias))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCatalogoGuardias no es un valor válido'
    });
  }

  const CatalogoGuardias = await catalogoguardias.findByPk(idCatalogoGuardias);
  
  if (CatalogoGuardias)
  {
    response.json({
      data: CatalogoGuardias,
      success: true,
      message: 'Datos obtenidos correctamente'
    });
  }
  else
  {
    response.status(404).json({
      data: CatalogoGuardias,
      success: false,
      message: 'No existe registro con el id ' + CatalogoGuardias
    });
  }
}

//Crea el Catalogo de Guardias
export const createCatalogoGuardias = async (request: Request, response: Response) => {
  const body = request.body;

  try
  {
    const CatalogoGuardias = catalogoguardias.build(body);
    await CatalogoGuardias.save();

    //Guardamos el resultado de la consulta ejecutada
    const resultCreate: any = CatalogoGuardias;

    //Objeto con los datos creados para mandar como respuesta
    const dataCreated = {
      idGuardia: resultCreate.null,
      nombre: resultCreate.nombre,
      clave: resultCreate.clave,
      descripcion: resultCreate.descripcion,
      fk_idTipoGuardia: resultCreate.fk_idTipoGuardia,
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

export const updateCatalogoGuardias = async (request: Request, response: Response) => {

  const body =  request.body;

  try
  {
    //Si en el body del response no viene el 'idControlConfianza'
    if (!body.idGuardia)
    {
      return response.status(400).json({
        data: null,
        success: false,
        message: 'El idCatalogoGuardia es requerido'
      });
    }

    const CatalogoGuardias = await catalogoguardias.findByPk(body.idGuardia);

    //Si no existe registro del idDepartamento proporcionado
    if (!CatalogoGuardias)
    {
      return response.status(404).json({
        data: CatalogoGuardias,
        success: false,
        message: 'No existe registro con el id ' + body.idDepartamento
      });
    }

    await CatalogoGuardias.update(body);

    response.json({
      data: CatalogoGuardias,
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

export const updateEstatusCatalogoGuardias = async (request: Request, response: Response) => {

  const idCatalogoGuardias = Number(request.params.idCatalogoGuardias);
  const estatus = request.query.estatus;

  // const body = request.body
  // const estatus = body.estatus

  if (isNaN(idCatalogoGuardias))
  {
    return response.status(400).json({
      data: null,
      success: false,
      message: 'El idCatalogoGuardias no es un valor válido'
    });
  }

  const CatalogoGuardias = await catalogoguardias.findByPk(idCatalogoGuardias);

  if (!CatalogoGuardias)
  {
    return response.status(404).json({
      data: null,
      success: false,
      message: 'No existe registro con el id ' + idCatalogoGuardias
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
    CatalogoGuardias.update({ estatus: false });
  }
  else if (estatus == 'false')
  {
    //Si el estatus viene con valor 'false' habilita el registro
    CatalogoGuardias.update({ estatus: true });
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
    data: CatalogoGuardias,
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