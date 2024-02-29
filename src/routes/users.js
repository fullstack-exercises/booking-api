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

const userExists = async (id) => {
  const user = await getUserById(id);
  return !!user;
};

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
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.param("id", async (req, res, next, id) => {
  try {
    const exists = await userExists(id);
    if (!exists) {
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exist` });
    }
    next();
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

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: `User with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUserId = await deleteUser(id);

    if (deletedUserId) {
      res.status(200).json({
        message: `User with id ${deletedUserId} was deleted!`,
      });
    } else {
      res.status(404).json({ message: `User with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
