import { CustomError } from "./customError";

export class ClientExists extends CustomError {
    constructor() {
      super(400, "Already exists a client with that cpf or email.");
    }
  }
  
  export class ClientNotFound extends CustomError {
    constructor() {
      super(400, "Client not found.");
    }
  }
  
 