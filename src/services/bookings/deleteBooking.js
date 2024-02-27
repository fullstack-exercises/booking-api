import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();

  const deletedBooking = await prisma.booking.deleteMany({
    where: {
      id,
    },
  });

  if (!deletedBooking || deletedBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }

  return id;
};
export default deleteBooking;
