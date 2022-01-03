"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//Conexión a la base de datos
const connection_1 = __importDefault(require("../db/connection"));
//Importación de archivos de rutas
const carrera_routes_1 = __importDefault(require("../routes/carrera.routes"));
const corporacion_routes_1 = __importDefault(require("../routes/corporacion.routes"));
const recursos_pago_routes_1 = __importDefault(require("../routes/recursos-pago.routes"));
const departamento_routes_1 = __importDefault(require("../routes/departamento.routes"));
const puesto_routes_1 = __importDefault(require("../routes/puesto.routes"));
const empleado_routes_1 = __importDefault(require("../routes/empleado.routes"));
const tallas_prenda_routes_1 = __importDefault(require("../routes/tallas-prenda.routes"));
const grado_academico_routes_1 = __importDefault(require("../routes/grado-academico.routes"));
const catalogo_horario_routes_1 = __importDefault(require("../routes/catalogo-horario.routes"));
class Server {
    constructor() {
        this.baseUrl = '/api/v0';
        //Nombre relativo de las rutas para los endpoints
        this.apiPaths = {
            carreras: this.baseUrl + '/Carreras',
            corporaciones: this.baseUrl + '/Corporaciones',
            recursosPago: this.baseUrl + '/RecursosPagos',
            departamento: this.baseUrl + '/Departamentos',
            puesto: this.baseUrl + '/Puestos',
            empleado: this.baseUrl + '/Empleados',
            tallasPrenda: this.baseUrl + '/TallasPrendas',
            gradosAcademico: this.baseUrl + '/GradosAcademicos',
            catalogoHorarios: this.baseUrl + '/CatalogoHorarios',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '3000';
        // Métodos iniciales
        this.databaseConnection();
        this.middlewares();
        //Definición de rutas
        this.routes();
    }
    databaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('La conexión a la base de datos ha sido correcta');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //Configuración del CORS
        this.app.use(cors_1.default());
        //Lectura del body (parser)
        this.app.use(express_1.default.json());
        //Carpeta Pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.carreras, carrera_routes_1.default);
        this.app.use(this.apiPaths.corporaciones, corporacion_routes_1.default);
        this.app.use(this.apiPaths.recursosPago, recursos_pago_routes_1.default);
        this.app.use(this.apiPaths.departamento, departamento_routes_1.default);
        this.app.use(this.apiPaths.puesto, puesto_routes_1.default);
        this.app.use(this.apiPaths.empleado, empleado_routes_1.default);
        this.app.use(this.apiPaths.tallasPrenda, tallas_prenda_routes_1.default);
        this.app.use(this.apiPaths.gradosAcademico, grado_academico_routes_1.default);
        this.app.use(this.apiPaths.catalogoHorarios, catalogo_horario_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map