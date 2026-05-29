const prisma = require('../prisma/prisma');

class DashboardService {
  async getStats() {
    const totalUsers = await prisma.user.count();

    const totalVehicles = await prisma.vehicle.count();

    const totalRentals = await prisma.rental.count();

    return {
      totalUsers,
      totalVehicles,
      totalRentals
    };
  }
}

module.exports = new DashboardService();
