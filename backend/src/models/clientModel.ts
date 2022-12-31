import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  cpf: {
    type: String,
    required: [true, "Please add your cpf"],
    unique: true,
  },
});

export default module.exports = mongoose.model("Client", clientSchema);
