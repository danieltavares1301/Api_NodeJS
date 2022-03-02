import UserModel from "../model/UserModel.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};

// toda a lógica que busca as informações no Model e devolve uma resposta ao usuário
class UserController {
  //retorna 1 dado
  async getOne(request, response) {
    const id = request.params.id;

    try {
      const user = await UserModel.findById(id); //findOne() buscaria qualquer outro registro, mas findById() é apenas o id

      if (user) {
        return response.send(user);
      }
      response.status(404).send({ message: "User not found" });
    } catch {
      response.status(400).send({ message: "An unexpected error happened" });
    }
  }
  //retorna todos
  async index(request, response) {
    const users = await UserModel.find();
    response.send(users);
  }

  async login(request, response) {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email }).lean(); //tira todas as funções do modelo do mongoose e traz apenas o dado

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    // compara as senhas em string e bcrypt
    if (!bcryptjs.compareSync(password, user.password)) {
      return response.status(404).json({ message: "Password Invalid" });
    }

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      "supersecrettoken"
    );

    return response.json({ token });
  }

  async remove(request, response) {
    const id = request.params.id;
    const user = UserModel.findById(id);
    if (user) {
      await user.remove();
      return response.send({ message: "user removed" });
    }

    response.status(404).send({ message: "user not found!" });
  }
  //POST
  async store(request, response) {
    const { name, email, password, profession, picture } = request.body;

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword(password),
      profession,
      picture,
    });

    response.send({ message: "user created", user });
  }
  async update(request, response) {
    const id = request.params.id;
    const { name, email, password, profession, picture } = request.body;

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        profession,
        picture,
      },
      {
        new: true,
      }
    );

    response.send(user);
  }
}

export default UserController;
