import { PrismaClient } from "@prisma/client";

const getUsers = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    where: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
};

export default getUsers;
