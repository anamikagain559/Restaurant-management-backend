import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ReviewControllers } from "./reviews.controller";

const router = Router();

/**
 * Create a review
 * Only logged-in users
 */
router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewControllers.createReview
);

/**
 * Get all reviews for a menu item (public)
 */
router.get(
  "/menu-item/:menuItemId",
  ReviewControllers.getReviewsByMenuItem
);

/**
 * Update own review
 */
router.patch(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewControllers.updateReview
);

/**
 * Delete own review
 */
router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewControllers.deleteReview
);

// ✅ EXPORT ROUTER
export const reviewsRoutes = router;
