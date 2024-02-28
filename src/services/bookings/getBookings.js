import { PrismaClient } from "@prisma/client";

const getBookings = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  return prisma.booking.findMany({
    where: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

export default getBookings;
