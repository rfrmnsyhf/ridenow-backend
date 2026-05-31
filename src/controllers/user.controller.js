const userService =
  require("../services/user.service");

const {

  successResponse,
  errorResponse,

} = require("../utils/response");

class UserController {

  async getAll(req, res) {

    try {

      const users =
        await userService.getAll();

      return successResponse(

        res,
        "User list",
        users

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

      await userService.delete(
        req.params.id
      );

      return successResponse(
        res,
        "User deleted"
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
  new UserController();