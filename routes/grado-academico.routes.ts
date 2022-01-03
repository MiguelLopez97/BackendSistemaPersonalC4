import { Router } from 'express';
import { getAllGradosAcademicos, getGradoAcademicoById, createGradoAcademico, updateGradoAcademico, disableGradoAcademico } from '../controllers/grados-academicos.controller';

const router = Router();

router.get('/', getAllGradosAcademicos);
router.get('/:idGradoAcademico', getGradoAcademicoById);
router.post('/', createGradoAcademico);
router.put('/', updateGradoAcademico);
router.delete('/:idGradoAcademico', disableGradoAcademico);

export default router;