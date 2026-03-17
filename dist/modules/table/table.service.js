"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableServices = void 0;
const table_model_1 = require("./table.model");
const createTable = async (payload) => {
    const result = await table_model_1.Table.create(payload);
    return result;
};
const getAllTables = async () => {
    const result = await table_model_1.Table.find();
    return result;
};
const updateTable = async (id, payload) => {
    const result = await table_model_1.Table.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
const deleteTable = async (id) => {
    const result = await table_model_1.Table.findByIdAndDelete(id);
    return result;
};
exports.TableServices = {
    createTable,
    getAllTables,
    updateTable,
    deleteTable,
};
