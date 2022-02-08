import express, { Application } from 'express';
import cors from 'cors';

//Conexión a la base de datos
import database from '../db/connection';

//Importación de archivos de rutas
import carreraRoutes from '../routes/carrera.routes';
import corporacionRoutes from '../routes/corporacion.routes';
import recursosPagoRoutes from '../routes/recursos-pago.routes';
import departamentoRoutes from '../routes/departamento.routes';
import puestoRoutes from '../routes/puesto.routes';
import empleadoRoutes from '../routes/empleado.routes';
import tallasPrendaRoutes from '../routes/tallas-prenda.routes';
import gradosAcademicoRoutes from '../routes/grado-academico.routes';
import catalogoHorariosRoutes from '../routes/catalogo-horario.routes';
import horarioEmpleadosRoutes from '../routes/horario-empleado.routes';
import controlconfianzaRoutes from '../routes/controlconfianza.routes';
import altasbajasempleadosRoutes from '../routes/altasbajasempleados.routes';
import tiposguardiasRoutes from '../routes/tiposguardias.routes';
import catalogoguardiasRoutes from '../routes/catalogoguardias.routes';
import asignacionguardiasRoutes from '../routes/asignacionguardias.routes';
import catalogoeventosRoutes from '../routes/catalogoeventos.route';
import registroeventosRoutes from '../routes/registroeventos.route';
import configuracionesRoutes from '../routes/configuraciones.route';
import usersRoutes from '../routes/users.route';


export class Server {

  private baseUrl: string = '/api/v0'

  private app: Application;
  private port: string;

  //Nombre relativo de las rutas para los endpoints
  private apiPaths = {
    carreras: this.baseUrl + '/Carreras',
    corporaciones: this.baseUrl + '/Corporaciones',
    recursosPago: this.baseUrl + '/RecursosPagos',
    departamento: this.baseUrl + '/Departamentos',
    puesto: this.baseUrl + '/Puestos',
    empleado: this.baseUrl + '/Empleados',
    tallasPrenda: this.baseUrl + '/TallasPrendas',
    gradosAcademico: this.baseUrl + '/GradosAcademicos',
    catalogoHorarios: this.baseUrl + '/CatalogoHorarios',
    horarioEmpleados: this.baseUrl + '/HorarioEmpleados',
    controlconfianza: this.baseUrl + '/controlconfianza',
    altasbajasempleados: this.baseUrl + '/altasbajasempleados',
    tiposguardias: this.baseUrl + '/tiposguardias',
    catalogoguardias: this.baseUrl + '/catalogoguardias',
    asignacionguardias: this.baseUrl + '/asignacionguardias',
    catalogoeventos: this.baseUrl + '/catalogoeventos',
    registroeventos: this.baseUrl + '/registroeventos',
    configuraciones: this.baseUrl + '/configuraciones',
    users: this.baseUrl + '/users'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    // Métodos iniciales
    this.databaseConnection();
    this.middlewares();

    //Definición de rutas
    this.routes();
  }

  async databaseConnection()
  {
    try
    {
      await database.authenticate();
      console.log('La conexión a la base de datos ha sido correcta');
    }
    catch (error: any)
    {
      throw new Error(error);
    }
  }

  middlewares()
  {
    //Configuración del CORS
    this.app.use(cors());

    //Lectura del body (parser)
    this.app.use(express.json());

    //Carpeta Pública
    this.app.use(express.static('public'));
  }

  routes()
  {
    this.app.use(this.apiPaths.carreras, carreraRoutes);
    this.app.use(this.apiPaths.corporaciones, corporacionRoutes);
    this.app.use(this.apiPaths.recursosPago, recursosPagoRoutes);
    this.app.use(this.apiPaths.departamento, departamentoRoutes);
    this.app.use(this.apiPaths.puesto, puestoRoutes);
    this.app.use(this.apiPaths.empleado, empleadoRoutes);
    this.app.use(this.apiPaths.tallasPrenda, tallasPrendaRoutes);
    this.app.use(this.apiPaths.gradosAcademico, gradosAcademicoRoutes);
    this.app.use(this.apiPaths.catalogoHorarios, catalogoHorariosRoutes);
    this.app.use(this.apiPaths.horarioEmpleados, horarioEmpleadosRoutes);
    this.app.use(this.apiPaths.controlconfianza, controlconfianzaRoutes);
    this.app.use(this.apiPaths.altasbajasempleados, altasbajasempleadosRoutes);
    this.app.use(this.apiPaths.tiposguardias, tiposguardiasRoutes);
    this.app.use(this.apiPaths.catalogoguardias, catalogoguardiasRoutes);
    this.app.use(this.apiPaths.asignacionguardias, asignacionguardiasRoutes);
    this.app.use(this.apiPaths.catalogoeventos, catalogoeventosRoutes);
    this.app.use(this.apiPaths.registroeventos, registroeventosRoutes);
    this.app.use(this.apiPaths.configuraciones, configuracionesRoutes);
    this.app.use(this.apiPaths.users, usersRoutes);
  }

  listen()
  {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ' + this.port);
    });
  }
}