import { Router } from "express";
import {
    createHostel,
    getHostels,
    getHostelById,
    updateHostel,
    deleteHostel
} from "../controllers/hostelController.js";

const router = Router();

router.post("/createHostel", createHostel);
router.get("/", getHostels);
router.get("/:id", getHostelById);
router.put("/:id", updateHostel);
router.delete("/:id", deleteHostel);

export default router;
