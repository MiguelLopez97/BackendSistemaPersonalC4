export interface HorarioE {
    horariosempleados: Horariosempleado[];
    succes:            boolean;
    message:           string;
}

export interface Horariosempleado {
    idHorarioEmpleado: number;
    fk_idEmpleado:     number;
    mes:               string;
    anio:              string;
    datosHorario:      string;
    estatus:           boolean;
    createdAt:         Date;
    updatedAt:         Date;
}
