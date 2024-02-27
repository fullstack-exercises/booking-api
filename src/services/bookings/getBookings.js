import { PrismaClient } from "@prisma/client";

const getBookings = async (name) => {
  const prisma = new PrismaClient();

  return prisma.booking.findMany({
    where: {
      name,
    },
  });
};

export default getBookings;
