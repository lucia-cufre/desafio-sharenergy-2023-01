import { ClientDTO } from "./../models/clientDTO";
import { ClientBusiness } from "../business/clientBusiness";
import { Request, Response } from "express";
export class ClientController {
  constructor(private clientBusiness: ClientBusiness) {}

  public registerClient = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, address, cpf } = req.body;

      const client: ClientDTO = {
        name,
        email,
        phone,
        address,
        cpf,
      };

      await this.clientBusiness.registerClient(client);

      res.status(201).send({ message: "Client registered." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  };

  public getClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const client = await this.clientBusiness.getClient(id);
      res.status(200).send({ client: client });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  };

  public updateClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.clientBusiness.updateClient(id, req.body);
      res.status(200).send({ message: "Client updated" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  };

  public removeClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.clientBusiness.removeClient(id);
      res.status(200).send({ message: "Client deleted" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  };
}
