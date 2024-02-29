import { PrismaClient } from "@prisma/client";

const deleteReview = async (id) => {
  const prisma = new PrismaClient();

  const deletedReview = await prisma.review.deleteMany({
    where: {
      id,
    },
  });

  return id;
};
export default deleteReview;
