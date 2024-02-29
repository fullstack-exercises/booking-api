import { Router } from "express";

// Services
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";

// Middleware
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.query;
    const users = await getUsers(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    console.log("username", username);

    console.log("password", password);

    console.log("name", name);

    console.log("email", email);
    console.log("phoneNumber", phoneNumber);
    console.log("profilePicture", profilePicture);
    console.log("user", users);

    console.log("req.query", req.query);
    console.log("req", req);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    console.log("username", username);
    console.log("password", password);
    console.log("name", name);
    console.log("email", email);
    console.log("phoneNumber", phoneNumber);
    console.log("profilePicture", profilePicture);
    console.log(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res
        .status(404)
        .json({ message: `404: User with id ${id} was not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const updatedUser = await updateUserById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUserId = await deleteUser(id);

    res.status(200).json({
      message: `User with id ${deletedUserId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
