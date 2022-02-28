import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    picture: { type: String },
    name: { type: String, required: true }, //dentro de chaves dessa forma significa obrigatório
    email: { type: String, required: true },
    profession: { type: String },
    password: String,
  },
  {
    timestamps: true, // ele cria automaticamente a data de atualização e a data de modificação
  }
);
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
