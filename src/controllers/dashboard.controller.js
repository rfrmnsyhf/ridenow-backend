const dashboardService = require('../services/dashboard.service');

const {
  successResponse,
  errorResponse
} = require('../utils/response');

class DashboardController {
  async getStats(req, res) {
    try {
      const stats =
        await dashboardService.getStats();

      return successResponse(
        res,
        'Dashboard stats',
        stats
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }
}

module.exports = new DashboardController();
