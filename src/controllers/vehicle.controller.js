const vehicleService = require('../services/vehicle.service');

const {
  successResponse,
  errorResponse
} = require('../utils/response');

class VehicleController {
  async create(req, res) {
    try {
      const vehicle =
        await vehicleService.create(req.body);

      return successResponse(
        res,
        'Vehicle created',
        vehicle,
        201
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }

  async getAll(req, res) {
    try {
      const vehicles =
        await vehicleService.getAll();

      return successResponse(
        res,
        'Vehicle list',
        vehicles
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }

  async getById(req, res) {
    try {
      const vehicle =
        await vehicleService.getById(
          req.params.id
        );

      return successResponse(
        res,
        'Vehicle detail',
        vehicle
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }

  async update(req, res) {
    try {
      const vehicle =
        await vehicleService.update(
          req.params.id,
          req.body
        );

      return successResponse(
        res,
        'Vehicle updated',
        vehicle
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }

  async delete(req, res) {
    try {
      await vehicleService.delete(
        req.params.id
      );

      return successResponse(
        res,
        'Vehicle deleted'
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }
}

module.exports = new VehicleController();
