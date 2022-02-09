import { Request, Response } from 'express';

const esAdminRole = async (request: Request, response: Response, next: any) =>{
    
    if(!request.usua){
        return response.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }

    const rol = request.usua.UserRol;

    if (rol !== 'Administrador'){
        return response.status(401).json({
            msg: `${request.usua.NameUser} no es administrador - No puede hacer eso`
        });
    }

    next();
}

const tieneRole = (...roles : any) =>{

    return(request: Request, response: Response, next: any) =>{
        if(!request.usua){
            return response.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            });
        }

        if(!roles.includes(request.usua.UserRol)){
            return response.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}