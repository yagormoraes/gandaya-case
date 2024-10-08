import { Router } from 'express';
import { handleCheckout, handleAbandonCheckout, getUserCheckouts } from '../controllers/checkoutController';
import { getUserBalance, getPurchaseHistory, addUserBalance } from '../controllers/userController';
import { getMenuItems, updateProductQuantity } from '../controllers/menuController';

const router = Router();

router.get('/user/:userId/checkouts', getUserCheckouts);
router.get('/balance/:id', getUserBalance);
router.patch('/balance/add/:id', addUserBalance)
router.get('/purshaceHistory/:id', getPurchaseHistory);
router.get('/menu', getMenuItems);
router.patch('/menu/update-quantity', updateProductQuantity)
router.post('/checkout', handleCheckout);
router.post('/checkout/abandon', handleAbandonCheckout);

export default router;
