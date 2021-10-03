import express, { Request, Response, NextFunction } from 'express';
import categoryController from '../controllers/categoryController';
import Category from '../models/category';
import { ICategory } from '../constants/types';

const router = express.Router();

// GET ALL
router.get('/', categoryController.category_get_all);

// GET ONE
router.get('/:id', getCategory, categoryController.category_get);

// CREATE ONE
router.post('/', categoryController.category_post);

// UPDATE ONE
router.patch('/:id', getCategory, categoryController.category_patch);

// DELETE ONE
router.delete('/:id', getCategory, categoryController.category_delete);

// create type for custom middleware response
export interface GetCategoryResponse extends Response {
  category?: ICategory;
}

// Middleware
async function getCategory(
  req: Request,
  res: GetCategoryResponse,
  next: NextFunction
) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category === null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  res.category = category;
  next();
}

export default router;
