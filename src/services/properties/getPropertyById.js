import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", id);
  }

  return property;
};

export default getPropertyById;
