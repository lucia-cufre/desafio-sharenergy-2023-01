import { UserDTO } from "../models/userDTO";
import { Request, Response } from "express";
import { UsersBusiness } from "../business/userBusiness";
export class UsersController {
  constructor(private userBusiness: UsersBusiness) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user: UserDTO = {
        username,
        password,
      };

      await this.userBusiness.createUser(user);

      res.status(201).send({ message: "User created." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  };

  public loginUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user: UserDTO = {
        username,
        password,
      };

      const token = await this.userBusiness.loginUser(user);

      res.status(200).send({ token: token });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  };
}
