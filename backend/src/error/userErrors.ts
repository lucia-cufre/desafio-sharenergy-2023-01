import { CustomError } from "./customError";

export class UserExists extends CustomError {
    constructor() {
      super(400, "Already exists an user with that username.");
    }
  }
  
  export class UserNotFound extends CustomError {
    constructor() {
      super(404, "User not found.");
    }
  }
  
  export class InvalidCredentials extends CustomError {
    constructor() {
      super(422, "Password invalid.");
    }
  }