import { EmailValidation } from "./../services/emailValidation";
import { ClientBusiness } from "./../business/clientBusiness";
import { ClientController } from "./../controller/clientController";
import express from "express";
import { authenticated } from "../middleware/authMiddleware";

export const clientRouter = express.Router();
const emailValidation = new EmailValidation();
const clientBusiness = new ClientBusiness(emailValidation);
const clientController = new ClientController(clientBusiness);

clientRouter.post("/register", authenticated, (req, res) =>
  clientController.registerClient(req, res)
);
clientRouter
  .route("/:id")
  .get(authenticated, (req, res) => clientController.getClient(req, res))
  .put(authenticated, (req, res) => clientController.updateClient(req, res))
  .delete(authenticated, (req, res) => clientController.removeClient(req, res));
