import { Router } from 'express';
import { getAllGradosAcademicos, getGradoAcademicoById, createGradoAcademico, updateGradoAcademico, updateEstatusGradosAcademicos } from '../controllers/grados-academicos.controller';

const router = Router();

router.get('/', getAllGradosAcademicos);
router.get('/:idGradoAcademico', getGradoAcademicoById);
router.post('/', createGradoAcademico);
router.put('/', updateGradoAcademico);
router.delete('/:idGradoAcademico', updateEstatusGradosAcademicos);

export default router;