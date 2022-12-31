export class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
  }
}

export class MissingCredentials extends CustomError {
  constructor() {
    super(422, "All fields must be filled");
  }
}

export class InvalidEmail extends CustomError{
  constructor(){
      super(422, "Must provide a valid email.")
  }
}





