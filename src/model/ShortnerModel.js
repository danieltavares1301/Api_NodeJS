import mongoose from "mongoose";

const ShortnerSchema = new mongoose.Schema(
  {
    link: { type: String, required: true }, //link original
    hash: { type: String, required: true, unique: true }, // unique para o hash ser unico
    hits: { type: String, default: 0 }, //qtd de acessos
    metadata: [
      mongoose.SchemaTypes.Mixed, //pode ser qualquer tipo
    ],
    ownerId: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const ShortnerModel = mongoose.model("Shortner", ShortnerSchema);

export default ShortnerModel;
