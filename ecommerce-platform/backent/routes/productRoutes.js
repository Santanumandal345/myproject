import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public routes
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', protect, createProductReview);

// Admin-only routes
router.route('/')
  .post(protect, admin, createProduct);

router.route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;