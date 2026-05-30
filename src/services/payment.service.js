const prisma =
require('../prisma/prisma');

class PaymentService {

  async create(userId, data) {

    return await prisma.paymentMethod.create({

      data: {

        userId,

        type:
          data.type,

        provider:
          data.provider,

        accountName:
          data.accountName,

        accountNo:
          data.accountNo,

        isDefault:
          data.isDefault || false,

      },

    });
  }

  async getAll(userId) {

    return await prisma.paymentMethod.findMany({

      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },

    });
  }

  async getById(id) {

    return await prisma.paymentMethod.findUnique({

      where: {
        id: Number(id),
      },

    });
  }

  async update(id, data) {

    return await prisma.paymentMethod.update({

      where: {
        id: Number(id),
      },

      data,

    });
  }

  async delete(id) {

    return await prisma.paymentMethod.delete({

      where: {
        id: Number(id),
      },

    });
  }
}

module.exports =
new PaymentService();