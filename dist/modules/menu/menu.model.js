"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const mongoose_1 = require("mongoose");
const menu_interface_1 = require("./menu.interface");
const menuSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: Object.values(menu_interface_1.MenuCategory),
        required: true,
    },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });
exports.Menu = (0, mongoose_1.model)("Menu", menuSchema);
