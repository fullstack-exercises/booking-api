import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updatePropertyById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const updatedProperty = await prisma.property.updateMany({
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

  if (!updatedProperty || updatedProperty.count === 0) {
    throw new NotFoundError("Property", id);
  }

  return {
    message: `Property with id ${id} was updated!`,
  };
};

export default updatePropertyById;
