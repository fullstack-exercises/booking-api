import { PrismaClient } from "@prisma/client";

const getHosts = async (name, email, phoneNumber, profilePicture, aboutMe) => {
  const prisma = new PrismaClient();

  return prisma.host.findMany({
    where: {
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
};

export default getHosts;
