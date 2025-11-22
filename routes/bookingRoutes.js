import { Router } from "express";
import {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    cancelBooking
} from "../controllers/bookingController.js";

const router = Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", cancelBooking);

export default router;
