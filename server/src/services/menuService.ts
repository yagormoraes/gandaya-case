import menuRepository from '../repositories/menuRepository';
import { MenuItem, StockUpdateItem, StockOperation } from '../types';

const getMenuItems = (): Promise<MenuItem[]> => {
    return menuRepository.getMenuItems();
};

const getMenuItemById = (menuItemId: number): Promise<MenuItem | null> => {
    return menuRepository.getMenuItemById(menuItemId);
};

const updateMenuItemsStock = (items: StockUpdateItem[], operation: StockOperation): Promise<MenuItem[]> => {
    return menuRepository.updateMenuItemsStock(items, operation);
};

export default { getMenuItems, getMenuItemById, updateMenuItemsStock };
