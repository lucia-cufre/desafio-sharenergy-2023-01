import { MissingCredentials, InvalidEmail } from "./../error/customError";
import { ClientDTO } from "./../models/clientDTO";
import { EmailValidation } from "./../services/emailValidation";
import Client from "../models/clientModel";
import { ClientExists, ClientNotFound } from "../error/clientErrors";

export class ClientBusiness {
  constructor(private emailValidation: EmailValidation) {}

  // @desc    Register new client
  // @route   POST /clients/register
  public registerClient = async (input: ClientDTO): Promise<void> => {
    try {
      const { name, email, phone, address, cpf } = input;

      if (!name || !email || !phone || !address || !cpf) {
        throw new MissingCredentials();
      }

      const clientExist = await Client.findOne({ cpf, email });

      if (clientExist) {
        throw new ClientExists();
      }

      const validEmail = this.emailValidation.regexEmail();

      if (validEmail.test(email) !== true) {
        throw new InvalidEmail();
      }

      await Client.create({
        name,
        email,
        phone,
        address,
        cpf,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // @desc    Get all clients
  // @route   GET /clients
  public getAllClients = async () => {
    try {
      const clients = await Client.find();

      return clients
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // @desc    Get client data
  // @route   GET /clients/:id
  public getClient = async (param: string): Promise<ClientDTO> => {
    try {
      const id = param;

      const client = await Client.findById(id);

      if (!client) {
        throw new ClientNotFound();
      }

      return client;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // @desc    Update client
  // @route   PUT /clients/:id
  public updateClient = async (param: string, input: ClientDTO) => {
    try {
      const id = param;

      const client = await Client.findById(id);

      if (!client) {
        throw new ClientNotFound();
      }

      await Client.findByIdAndUpdate(id, input, { new: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // @desc    Delete client
  // @route   DELETE /clients/:id
  public removeClient = async (param: string) => {
    try {
      const id = param;

      const client = await Client.findById(id);

      if (!client) {
        throw new ClientNotFound();
      }
      await client.remove();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
