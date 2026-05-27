import { Router } from "express";
import {
  getMedicalRecords,
  createMedicalRecord,
  getFavorites,
  toggleFavorite,
  checkFavorite,
} from "../controllers/patientController";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// Medical Records
router.get("/records", authenticate, authorize("user"), getMedicalRecords);
router.post("/records", authenticate, authorize("user"), createMedicalRecord);

router.get("/favorites", authenticate, authorize("user"), getFavorites);
router.post("/favorites/:doctorId", authenticate, authorize("user"), toggleFavorite);
router.get("/favorites/:doctorId/check", authenticate, authorize("user"), checkFavorite);

export default router;
