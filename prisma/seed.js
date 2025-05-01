const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: 'First Post',
        content: 'Contenido del first post',
        published: true,
      },
      {
        title: 'Second Post',
        content: 'Contenido del second post',
        published: false,
      },
      {
        title: 'Third Post',
        content: 'Contenido del third post',
        published: true,
      },
      {
        title: 'Fourth Post',
        content: 'Contenido del fourth post',
        published: false,
      },
      {
        title: 'Fifth Post',
        content: 'Contenido del fifth post',
        published: true,
      },
    ],
  });
  console.log('Database seeded with posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
