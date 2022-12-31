import { NextFunction } from "express";
import { Request, Response } from "express";
import { AuthenticationData, TokenGenerator } from "../services/tokenGenerator";
const tokenGenerator = new TokenGenerator()

function authenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authentication: string = request.headers.authorization as string;

  const accessToken: AuthenticationData =
  tokenGenerator.tokenData(authentication);

  if (accessToken === null)
    return response.status(400).json({ message: "invalid token" });

  return next();
}

export { authenticated };