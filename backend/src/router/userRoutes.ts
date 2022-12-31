import { TokenGenerator } from "./../services/tokenGenerator";
import { HashManager } from "./../services/hashManager";
import { UsersBusiness } from "../business/userBusiness";
import express from "express";
import { UsersController } from "../controller/userController";

export const userRouter = express.Router();
const hashManager = new HashManager();
const tokenGenerator = new TokenGenerator();
const userBusiness = new UsersBusiness(hashManager, tokenGenerator);
const userController = new UsersController(userBusiness);

userRouter.post("/signup", (req, res) => userController.createUser(req, res));
userRouter.post("/login", (req, res) => userController.loginUser(req, res));
