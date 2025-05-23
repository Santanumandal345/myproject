import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Protected routes
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin-only routes
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;