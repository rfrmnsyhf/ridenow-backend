const authService = require('../services/auth.service');

const {
  successResponse,
  errorResponse
} = require('../utils/response');

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(
        req.body
      );

      const userResponse = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };

      return successResponse(
        res,
        'Register success',
        userResponse,
        201
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(
        email,
        password
      );

      return successResponse(
        res,
        'Login success',
        result
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  }

  async me(req, res) {

    try {

      const user =
        await authService.getProfile(
          req.user.id
        );

      return successResponse(
        res,
        "Get profile success",
        user
      );

    } catch (error) {

      return errorResponse(
        res,
        error.message
      );

    }
  }

  async updateProfile(req, res) {

    try {

      const user =
        await authService.updateProfile(

          req.user.id,

          {
            fullname:
              req.body.fullname,

            email:
              req.body.email,
          }

        );

      return successResponse(
        res,
        "Profile updated",
        user
      );

    } catch (error) {

      return errorResponse(
        res,
        error.message
      );

    }
  }

}

module.exports = new AuthController();