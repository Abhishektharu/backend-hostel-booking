import { Router } from "express";
import {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from "../controllers/roomController.js";

const router = Router();

router.post("/createRoom", createRoom);
router.get("/", getRooms);
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
