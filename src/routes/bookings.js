import { Router } from "express";

// Services
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBooking from "../services/bookings/deleteBooking.js";

// Middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.query;
    const bookings = await getBookings(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(200).json(bookings);
    console.log("bookings", bookings);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ message: `Booking with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const updatedBooking = await updateBookingById(
      id,
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: `Booking with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBookingId = await deleteBooking(id);

    if (deletedBookingId) {
      res.status(200).json({
        message: `Booking with id ${deletedBookingId} was deleted!`,
      });
    } else {
      res.status(404).json({ message: `Booking with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

export default router;
