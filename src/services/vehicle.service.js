const prisma = require('../prisma/prisma');

class VehicleService {
  async create(data) {
    return await prisma.vehicle.create({
      data
    });
  }

  async getAll() {
    return await prisma.vehicle.findMany();
  }

  async getById(id) {
    return await prisma.vehicle.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  async update(id, data) {
    return await prisma.vehicle.update({
      where: {
        id: Number(id)
      },
      data
    });
  }

  async delete(id) {
    return await prisma.vehicle.delete({
      where: {
        id: Number(id)
      }
    });
  }
}

module.exports = new VehicleService();
