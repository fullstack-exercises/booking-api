import { PrismaClient } from "@prisma/client";

const createBooking = async (name) => {
  const prisma = new PrismaClient();

  return prisma.booking.create({
    data: {
      name,
    },
  });
};

export default createBooking;
