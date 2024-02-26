import { Router } from "express";

// Services
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBooking from "../services/bookings/deleteBooking.js";

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const bookings = await getBookings(name);
  res.status(200).json(bookings);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newBooking = await createBooking(name);
  res.status(201).json(newBooking);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedBooking = await updateBookingById(id, name);
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBookingId = await deleteBooking(id);

    res.status(200).json({
      message: `Booking with id ${deletedBookingId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
