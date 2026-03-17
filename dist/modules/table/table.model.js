"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const mongoose_1 = require("mongoose");
const table_interface_1 = require("./table.interface");
const tableSchema = new mongoose_1.Schema({
    tableNumber: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(table_interface_1.TableStatus),
        default: table_interface_1.TableStatus.AVAILABLE,
    },
}, { timestamps: true, versionKey: false });
exports.Table = (0, mongoose_1.model)("Table", tableSchema);
