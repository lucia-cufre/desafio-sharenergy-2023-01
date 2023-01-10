import * as jwt from "jsonwebtoken";

export class TokenGenerator {
  public generateToken = (id: string) => {
    const token = jwt.sign({ id }, JWT_KEY as string, {
      expiresIn: "24h",
    });
    return token;
  };

  public tokenData = (token:string): AuthenticationData => {
    const payload = jwt.verify(
        token,
       JWT_KEY as string
    ) as jwt.JwtPayload

    return{id:payload.id as string}
  }
}

export type AuthenticationData = {
    id:string
}

const JWT_KEY="desafio123456"