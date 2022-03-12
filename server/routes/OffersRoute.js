import express from "express";
import adminController from "../controllers/OffersControllers.js";
import adminMiddleware from '../middleware/OffersMiddleware.js';
import authMiddleware from "../middleware/RegistrationMiddleware.js";
import { check } from "express-validator"
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post(
    "/UploadPhoto",
    upload.single("some_name"),
    adminController.UploadPhoto
);
router.post("/AddHouse", adminMiddleware, [
    check("name", "Name can't be empty").notEmpty(),
    check("image", "Image can't be empty").notEmpty(),
    check("description", "Description can't be empty").notEmpty(),
], adminController.AddHouse);
router.post("/RemoveHouse", adminMiddleware, adminController.RemoveHouse);
router.get("/GetHouses", authMiddleware, adminController.GetHouses)

export default router;