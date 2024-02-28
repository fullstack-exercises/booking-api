import { PrismaClient } from "@prisma/client";

const getReviews = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  return prisma.review.findMany({
    where: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};

export default getReviews;
