
import { PrismaClient } from '@prisma/client';

export const loader = async ({ params }) => {
    const prisma = new PrismaClient();
  const productId = params.productId;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  return new Response(JSON.stringify(product), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
