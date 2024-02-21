import { PrismaClient } from "@prisma/client";

const getUsers = async (name, email, phoneNumber, profilePicture) => {
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    where: {
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
};

export default getUsers;
