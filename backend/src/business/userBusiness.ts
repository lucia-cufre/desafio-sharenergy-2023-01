import { MissingCredentials } from "../error/customError";
import { UserDTO } from "../models/userDTO";
import { TokenGenerator } from "../services/tokenGenerator";
import { HashManager } from "../services/hashManager";
import User from "../models/userModule";
import {
  InvalidCredentials,
  UserExists,
  UserNotFound,
} from "../error/userErrors";

export class UsersBusiness {
  constructor(
    private hashManager: HashManager,
    private tokenGenerator: TokenGenerator
  ) {}

  // @desc    Register new user
  // @route   POST /signup
  public createUser = async (input: UserDTO) => {
    try {
      const { username, password } = input;

      if (!username || !password) {
        throw new MissingCredentials();
      }

      const userExist = await User.findOne({ username });

      if (userExist) {
        throw new UserExists();
      }

      const hashPassword = await this.hashManager.hash(password);

      await User.create({
        username,
        password: hashPassword,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // @desc    Login user
  // @route   POST /login
  public loginUser = async (input: UserDTO) => {
    try {
      const { username, password } = input;

      if (!username || !password) {
        throw new MissingCredentials();
      }

      const userExist = await User.findOne({ username });

      if (!userExist) {
        throw new UserNotFound();
      }

      const passwordCorrect = await this.hashManager.compare(
        password,
        userExist.password
      );

      if (!passwordCorrect) {
        throw new InvalidCredentials();
      }

      const token = this.tokenGenerator.generateToken(userExist.id);

      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
