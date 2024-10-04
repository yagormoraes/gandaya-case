import { getMenuFromDB } from "../repositories/menuRepository";

export const getMenu = () => {
    return getMenuFromDB();
};
