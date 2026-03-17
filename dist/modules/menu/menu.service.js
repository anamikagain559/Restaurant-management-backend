"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuServices = void 0;
const menu_model_1 = require("./menu.model");
const createMenu = async (payload) => {
    const result = await menu_model_1.Menu.create(payload);
    return result;
};
const getAllMenus = async () => {
    const result = await menu_model_1.Menu.find();
    return result;
};
const getMenuById = async (id) => {
    const result = await menu_model_1.Menu.findById(id);
    return result;
};
const updateMenu = async (id, payload) => {
    const result = await menu_model_1.Menu.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
const deleteMenu = async (id) => {
    const result = await menu_model_1.Menu.findByIdAndDelete(id);
    return result;
};
exports.MenuServices = {
    createMenu,
    getAllMenus,
    getMenuById,
    updateMenu,
    deleteMenu,
};
