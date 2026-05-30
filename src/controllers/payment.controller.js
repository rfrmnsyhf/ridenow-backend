const paymentService =
require('../services/payment.service');

const {
  successResponse,
  errorResponse
} = require('../utils/response');

class PaymentController {

  async create(req, res) {

    try {

      const payment =
        await paymentService.create(

          req.user.id,

          req.body

        );

      return successResponse(
        res,
        'Payment method created',
        payment,
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

      const payments =
        await paymentService.getAll(
          req.user.id
        );

      return successResponse(
        res,
        'Payment methods',
        payments
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

      const payment =
        await paymentService.getById(
          req.params.id
        );

      return successResponse(
        res,
        'Payment detail',
        payment
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

      const payment =
        await paymentService.update(

          req.params.id,

          req.body

        );

      return successResponse(
        res,
        'Payment updated',
        payment
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

      await paymentService.delete(
        req.params.id
      );

      return successResponse(
        res,
        'Payment deleted'
      );

    } catch (error) {

      return errorResponse(
        res,
        error.message
      );

    }
  }
}

module.exports =
new PaymentController();