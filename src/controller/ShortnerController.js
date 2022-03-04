import ShortnerModel from "../model/ShortnerModel.js";
import crypto from "crypto";
import parser from "ua-parser-js";

class ShortnerController {
  async index(request, response) {
    const shortners = await ShortnerModel.find();

    response.json({ items: shortners });
  }

  async getOne(request, response) {
    //verificando a existência
    const id = request.params.id;

    try {
      const shortner = await ShortnerModel.findById(id);

      // se não existir retorna uma mensagem
      if (!shortner) {
        return response.status(404).json({ message: "Shortner not found" });
      }

      response.json(shortner);
    } catch (error) {
      response.status(400).json({ message: "An unexpected error happened" });
    }
  }

  async remove(request, response) {
    const id = request.params.id;

    try {
      const shortner = await ShortnerModel.findById(id);

      // se não existir retorna uma mensagem
      if (!shortner) {
        return response.status(404).json({ message: "Shortner not found" });
      }

      await shortner.remove();

      response.json({ message: "shortner removed" });
    } catch (error) {
      response.status(400).json({ message: "An unexpected error happened" });
    }
  }

  async store(request, response) {
    // o usuário só passará o link
    const { link } = request.body;

    if (!link.trim()) {
      //trim para impedir se for vazio
      return response.status(400).json({ message: "Link is missing" });
    }

    const [hash] = crypto.randomUUID().split("-"); //pegando a primeira parte de um hash antes do "-"

    const shortner = await ShortnerModel.create({
      link,
      hash,
      ownerId: request.loggedUser.id,
    });

    response.json({ message: "Shortner Created", shortner });
  }

  async update(request, response) {
    const { link = "" } = request.body;
    const id = request.params.id;

    try {
      const shortner = await ShortnerModel.findByIdAndUpdate(
        id,
        { link },
        { new: true }
      );

      if (!shortner) {
        return response.status(404).json({ message: "Shortner not found" });
      }

      response.json(shortner);
    } catch (error) {
      response.status(400).json({ message: "An unexpected error happened" });
    }
  }

  async redirect(request, response) {
    const { hash } = request.params;

    const shortner = await ShortnerModel.findOne({ hash });

    if (!shortner) {
      return response.redirect("/");
    }

    const metadata = {
      ip: request.ip,
      userAgent: userAgentData.data,
      appName: userAgentData.appName,
    };

    // atualizando quantidade de acessos
    shortner.hits += 1;
    shortner.metadata = [...shortner.metadata, metadata];
    await shortner.save();

    response.redirect(shortner.link);
  }
}

export default ShortnerController;
