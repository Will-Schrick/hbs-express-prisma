const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany(); // borra todos los usuarios antes del llenarlo

  const posts = [];
  const numberOfPosts = 50;

  for (i = 0; i < numberOfPosts; i++) {


    const post = {
      published: faker.datatype.boolean()
      
    };

    posts.push(post);
  }

  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
