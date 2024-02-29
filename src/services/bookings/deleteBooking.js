import { PrismaClient } from "@prisma/client";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();

  const deletedBooking = await prisma.booking.deleteMany({
    where: {
      id,
    },
  });

  return id;
};
export default deleteBooking;
