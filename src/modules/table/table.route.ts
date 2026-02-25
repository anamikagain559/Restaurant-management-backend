import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { validateRequest } from "../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { TableControllers } from "./table.controller";
import { createTableZodSchema, updateTableZodSchema } from "./table.validation";

const router = Router();

router.get("/", TableControllers.getAllTables);

router.post(
    "/",
    checkAuth(Role.ADMIN),
    validateRequest(createTableZodSchema),
    TableControllers.createTable
);

router.patch(
    "/:id",
    checkAuth(Role.ADMIN),
    validateRequest(updateTableZodSchema),
    TableControllers.updateTable
);

router.delete(
    "/:id",
    checkAuth(Role.ADMIN),
    TableControllers.deleteTable
);

export const TableRoutes = router;
