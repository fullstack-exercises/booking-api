import { PrismaClient } from "@prisma/client";

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();
  const updatedBooking = await prisma.booking.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return {
    message: `Booking with id ${id} was updated!`,
  };
};

export default updateBookingById;
