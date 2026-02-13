import { IMenu } from "./menu.interface";
import { Menu } from "./menu.model";

const createMenu = async (payload: IMenu) => {
    const result = await Menu.create(payload);
    return result;
};

const getAllMenus = async () => {
    const result = await Menu.find();
    return result;
};

const getMenuById = async (id: string) => {
    const result = await Menu.findById(id);
    return result;
};

const updateMenu = async (id: string, payload: Partial<IMenu>) => {
    const result = await Menu.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteMenu = async (id: string) => {
    const result = await Menu.findByIdAndDelete(id);
    return result;
};

export const MenuServices = {
    createMenu,
    getAllMenus,
    getMenuById,
    updateMenu,
    deleteMenu,
};
