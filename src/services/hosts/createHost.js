import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  return prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
      user: {
        connect: { id: user_id },
      },
    },
  });
};

export default createHost;
