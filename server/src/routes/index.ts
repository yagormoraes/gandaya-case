import { Router } from 'express';
import { handleCheckout } from '../controllers/checkoutController';
import { getUserBalance, getPurchaseHistory, addUserBalance } from '../controllers/userController';
import { getMenuItems, updateProductQuantity } from '../controllers/menuController';

const router = Router();

router.get('/balance/:id', getUserBalance);
router.patch('/balance/add/:id', addUserBalance)
router.get('/purshaceHistory/:id', getPurchaseHistory);
router.get('/menu', getMenuItems);
router.patch('/menu/update-quantity', updateProductQuantity)
router.post('/checkout', handleCheckout);

export default router;
