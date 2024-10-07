import menuRepository from '../repositories/menuRepository';

const getMenuItems = () => {
    return menuRepository.getMenuItems();
};

const getMenuItemById = (menuItemId: number) => {
    return menuRepository.getMenuItemById(menuItemId);
};

const updateMenuItemsStock = (items: any[],  operation: 'increment' | 'decrement') => {
    return menuRepository.updateMenuItemsStock(items, operation);
};

export default { getMenuItems, getMenuItemById, updateMenuItemsStock };
