import { PrismaClient } from "@prisma/client";

const getHosts = async (name) => {
  const prisma = new PrismaClient();

  return prisma.amenity.findMany({
    where: {
      name,
    },
  });
};

export default getHosts;
