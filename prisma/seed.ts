import { prisma } from '../src/common'
import { hashPassword } from '../src/utils/password'

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
