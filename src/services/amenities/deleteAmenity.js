import { PrismaClient } from "@prisma/client";

const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();

  const deleteAmenity = await prisma.amenity.deleteMany({
    where: {
      id,
    },
  });

  return id;
};
export default deleteAmenity;
