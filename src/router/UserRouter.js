import express from "express";
import UserController from "../controller/UserController.js";

const userController = new UserController();

const router = express.Router();

// midleware
router.use(express.json());

/* forma não enxuta
router.get("/api/users", (request, response) => {
  UserController.index(request, response);
});
*/
router.post("/api/login", userController.login);

router.get("/api/users", userController.index);

router.get("/api/user/:id", userController.getOne);

router.post("/api/user", userController.store);

router.put("/api/user/:id", userController.update);

router.delete("/api/user/:id", userController.remove);

export default router;
