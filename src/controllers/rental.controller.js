const rentalService = require('../services/rental.service');

const {
  successResponse,
  errorResponse
} = require('../utils/response');

class RentalController {
  async create(req, res) {
    try {
      const rental =
        await rentalService.create(req.body);

      return successResponse(
        res,
        'Rental created',
        rental,
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
      const rentals =
        await rentalService.getAll();

      return successResponse(
        res,
        'Rental list',
        rentals
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
      const rental =
        await rentalService.getById(
          req.params.id
        );

      return successResponse(
        res,
        'Rental detail',
        rental
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
      await rentalService.delete(
        req.params.id
      );

      return successResponse(
        res,
        'Rental deleted'
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }

  async updateStatus(req, res) {
    try {
      const rental = await rentalService.updateStatus(
        req.params.id,
        req.body.status
      );

      return successResponse(
        res,
        "Rental updated",
        rental
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }
}

module.exports = new RentalController();
