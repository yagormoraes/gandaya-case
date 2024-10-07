import menuRepository from '../repositories/menuRepository';

const getMenuItems = () => {
    return menuRepository.getMenuItems();
};

const getMenuItemById = (menuItemId: number) => {
    return menuRepository.getMenuItemById(menuItemId);
};

const updateMenuItemsStock = (items: any[]) => {
    return menuRepository.updateMenuItemsStock(items);
};

export default { getMenuItems, getMenuItemById, updateMenuItemsStock };
