class Validator {
  static validateUserDetails(taskInfo) {
    if (taskInfo.hasOwnProperty("email")) {
      if (taskInfo.email == "") {
        return {
          status: false,
          message: "Task info is malformed, please provide title",
        };
      }

      return {
        status: true,
        message: "Validated successfully",
      };
    } else {
      return {
        status: false,
        message: "User info is malformed, please provide all the parameters",
      };
    }
  }
}

module.exports = Validator;
