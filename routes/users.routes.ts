import { Router } from 'express';
const {validarJWT} = require('../middlewares/validar-jwt');
const {esAdminRole,tieneRole} = require('../middlewares/validar-roles');
import { getAllUsers, getUsersById, createUsers, updateUsers, updateEstatusUsers,ValidacionUsers, /*validarCampos*/ } from '../controllers/users.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:idUsers', getUsersById );
router.post('/', createUsers );
router.put('/', updateUsers );
router.delete('/:idUsers', [ validarJWT,tieneRole('Administrador','Externo','NoseRol')],updateEstatusUsers);
// router.delete('/', ValidacionUsers);

router.post('/Login',[
    // check('NameUser', 'El correo es obligatorio').isEmail(),
    // validarCampos
], ValidacionUsers);

export default router;