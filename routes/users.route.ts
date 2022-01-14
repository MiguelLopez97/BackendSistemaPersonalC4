import { Router } from 'express';
import {  getAllUsers, getUsersById, createUsers, updateUsers, updateEstatusUsers} from '../controllers/users.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:idUsers', getUsersById );
router.post('/', createUsers );
router.put('/', updateUsers );
router.delete('/:idUsers', updateEstatusUsers);
export default router;