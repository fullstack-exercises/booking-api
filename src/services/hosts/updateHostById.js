import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const updatedHost = await prisma.host.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  if (!updatedHost || updatedHost.count === 0) {
    throw new NotFoundError("Host", id);
  }

  return {
    message: `Host with id ${id} was updated!`,
  };
};

export default updateHostById;
