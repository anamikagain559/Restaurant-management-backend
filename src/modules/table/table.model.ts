import { model, Schema } from "mongoose";
import { ITable, TableStatus } from "./table.interface";

const tableSchema = new Schema<ITable>(
    {
        tableNumber: { type: Number, required: true, unique: true },
        capacity: { type: Number, required: true },
        status: {
            type: String,
            enum: Object.values(TableStatus),
            default: TableStatus.AVAILABLE,
        },
    },
    { timestamps: true, versionKey: false }
);

export const Table = model<ITable>("Table", tableSchema);
