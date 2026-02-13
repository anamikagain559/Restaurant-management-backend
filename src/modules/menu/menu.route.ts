import { Router } from "express";
import { MenuControllers } from "./menu.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/", MenuControllers.getAllMenus);
router.post("/", checkAuth(Role.ADMIN), MenuControllers.createMenu);
router.get("/:id", MenuControllers.getMenuById);
router.patch("/:id", checkAuth(Role.ADMIN), MenuControllers.updateMenu);
router.delete("/:id", checkAuth(Role.ADMIN), MenuControllers.deleteMenu);

export const MenuRoutes = router;
