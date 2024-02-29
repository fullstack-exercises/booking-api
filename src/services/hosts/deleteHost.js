import { PrismaClient } from "@prisma/client";

const deleteHost = async (id) => {
  const prisma = new PrismaClient();

  const deleteHost = await prisma.host.deleteMany({
    where: {
      id,
    },
  });

  return id;
};
export default deleteHost;
