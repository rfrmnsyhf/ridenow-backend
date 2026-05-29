const prisma = require('../prisma/prisma');

class RentalService {
  async create(data) {
    const rental = await prisma.rental.create({
      data: {
        userId: data.userId,
        vehicleId: data.vehicleId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalPrice: data.totalPrice
      }
    });

    await prisma.vehicle.update({
      where: {
        id: data.vehicleId
      },
      data: {
        status: 'rented'
      }
    });

    return rental;
  }

  async getAll() {
    return await prisma.rental.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
            role: true,
            createdAt: true
          }
        },
        vehicle: true
      }
    });
  }

  async getById(id) {
    return await prisma.rental.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
            role: true,
            createdAt: true
          }
        },
        vehicle: true
      }
    });
  }

  async delete(id) {
    return await prisma.rental.delete({
      where: {
        id: Number(id)
      }
    });
  }

  async updateStatus(id, status) {
    const rental = await prisma.rental.update({
      where: {
        id: Number(id)
      },
      data: {
        status
      }
    });

    if (status === 'completed') {
      await prisma.vehicle.update({
        where: {
          id: rental.vehicleId
        },
        data: {
          status: 'available'
        }
      });
    }

    return rental;
  }
}

module.exports = new RentalService();
