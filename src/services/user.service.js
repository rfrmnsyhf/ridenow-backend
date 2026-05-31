const prisma =
  require("../prisma/prisma");

class UserService {

  async getAll() {

    return await prisma.user.findMany({

      orderBy: {
        createdAt: "desc",
      },

      select: {

        id: true,
        fullname: true,
        email: true,
        role: true,
        createdAt: true,

      },
    });
  }

  async delete(id) {

    return await prisma.user.delete({

      where: {
        id: Number(id),
      },

    });
  }
}

module.exports =
  new UserService();