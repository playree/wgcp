import { PrismaClient } from '@prisma/client'

import { hashPassword } from '../src/utils/password'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'admin',
      passwordHash: hashPassword('lab@user00'),
      isAdmin: true,
    },
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
