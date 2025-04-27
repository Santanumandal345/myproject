import express from 'express';
const router = express.Router();

// Add your payment routes here
router.post('/create-payment-intent', (req, res) => {
  res.json({ clientSecret: 'test_client_secret' });
});

export default router;