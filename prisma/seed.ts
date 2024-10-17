import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import productData from "../lib/leafly_strain_data.json";
import { types, terpenes, effectTypes } from "../lib/data_details";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.com",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Test",
        email: "admin@test.com",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  const terpeneMap: { [key: string]: number } = {};
  for (const terpene of terpenes) {
    const existingTerpene = await prisma.terpene.findFirst({
      where: {
        name: terpene,
      },
    });
    if (!existingTerpene) {
      const createdTerpene = await prisma.terpene.create({
        data: {
          name: terpene,
        },
      });
      terpeneMap[terpene] = createdTerpene.id;
    } else {
      terpeneMap[terpene] = existingTerpene.id;
    }
  }

  const typeMap: { [key: string]: number } = {};
  for (const type of types) {
    const existingType = await prisma.type.findFirst({
      where: {
        name: type,
      },
    });
    if (!existingType) {
      const createdType = await prisma.type.create({
        data: {
          name: type,
        },
      });
      typeMap[type] = createdType.id;
    } else {
      typeMap[type] = existingType.id;
    }
  }

  const effectMap: { [key: string]: number } = {};
  for (const effect of effectTypes) {
    const existingEffect = await prisma.effect.findFirst({
      where: {
        name: effect,
      },
    });
    if (!existingEffect) {
      const createdEffect = await prisma.effect.create({
        data: {
          name: effect,
        },
      });
      effectMap[effect] = createdEffect.id;
    } else {
      effectMap[effect] = existingEffect.id;
    }
  }

  for (const product of productData) {
    const createdProduct = await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.img_url,
        thcLevel: product.thc_level,
        description: product.description,

        terpeneId: terpeneMap[product.most_common_terpene.toLowerCase()],
        typeId: typeMap[product.type],

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    for (const [effectName, value] of Object.entries(product.effects)) {
      const effectId = effectMap[effectName];
      if (effectId) {
        await prisma.productEffect.create({
          data: {
            product: { connect: { id: createdProduct.id } },
            effect: { connect: { id: effectId } },
            value: parseInt(value, 10),
          },
        });
      } else {
        console.log("effect not found =>", effectName);
      }
    }
  }

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "111111" },
      { userId: 2, totalAmount: 0, token: "111111" },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productId: 1,
      cartId: 1,
      quantity: 2,
    },
  });

  console.log("Seed data created successfully");
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Effect" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Type" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Terpene" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductEffect" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log("seed =>", error);
  }
}

main()
  .catch((error) => {
    console.log("seed =>", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
