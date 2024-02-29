import { PrismaClient } from "@prisma/client";

const deleteProperty = async (id) => {
  const prisma = new PrismaClient();

  const deleteProperty = await prisma.property.deleteMany({
    where: {
      id,
    },
  });

  return id;
};
export default deleteProperty;
