import { Router } from "express";

// Services
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";

const router = Router();

router.get("/", async (req, res) => {
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
});

router.post("/", async (req, res) => {
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
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
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
    res.status(200).json(updatedHost);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHostId = await deleteHost(id);

    res.status(200).json({
      message: `Host with id ${deletedHostId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;