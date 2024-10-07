import { Router } from 'express';
import { handleCheckout } from '../controllers/checkoutController';
import { getUserBalance, getPurchaseHistory, addUserBalance } from '../controllers/userController';
import { getMenuItems } from '../controllers/menuController';

const router = Router();

router.get('/balance/:id', getUserBalance);
router.post('/balance/add/:id', addUserBalance)
router.get('/purshaceHistory/:id', getPurchaseHistory);
router.get('/menu', getMenuItems);
router.post('/checkout', handleCheckout);

export default router;
