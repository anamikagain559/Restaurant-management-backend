import { ITable } from "./table.interface";
import { Table } from "./table.model";

const createTable = async (payload: ITable) => {
    const result = await Table.create(payload);
    return result;
};

const getAllTables = async () => {
    const result = await Table.find();
    return result;
};

const updateTable = async (id: string, payload: Partial<ITable>) => {
    const result = await Table.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteTable = async (id: string) => {
    const result = await Table.findByIdAndDelete(id);
    return result;
};

export const TableServices = {
    createTable,
    getAllTables,
    updateTable,
    deleteTable,
};
