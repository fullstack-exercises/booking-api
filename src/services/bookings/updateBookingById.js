import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateBookingById = async (id, name) => {
  const prisma = new PrismaClient();
  const updatedBooking = await prisma.booking.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  if (!updatedBooking || updatedBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }

  return {
    message: `Booking with id ${id} was updated!`,
  };
};

export default updateBookingById;
