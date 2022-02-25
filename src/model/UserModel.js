import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, //dentro de chaves dessa forma significa obrigatório
    email: { type: String, required: true },
    state: {
      type: String,
      enum: ["PA", "MA", "PE", "Other"], //valores que state pode receber
    },
    password: String,
    birthDate: Date,
    // xyz: mongoose.SchemaTypes.Mixed -> pode ser o que ele quiser
    phones: [String],
  },
  {
    timestamps: true, // ele cria automaticamente a data de atualização e a data de modificação
  }
);
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
