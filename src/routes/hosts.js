import { Router } from "express";

// Services
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";

// Middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

const hostExists = async (id) => {
  const host = await getHostById(id);
  return !!host;
};

router.get("/", async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.query;
    const hosts = await getHosts(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.param("id", async (req, res, next, id) => {
  try {
    const exists = await hostExists(id);
    if (!exists) {
      return res
        .status(404)
        .json({ message: `Host with id ${id} does not exist` });
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    if (host) {
      res.status(200).json(host);
    } else {
      res.status(404).json({ message: `Host with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const updatedHost = await updateHostById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    if (updatedHost) {
      res.status(200).json(updatedHost);
    } else {
      res.status(404).json({ message: `Host with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHostId = await deleteHost(id);

    if (deletedHostId) {
      res.status(200).json({
        message: `Host with id ${deletedHostId} was deleted!`,
      });
    } else {
      res.status(404).json({ message: `Host with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

export default router;
