import { Router } from "express";

// Services
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";

// Middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

const amenityExists = async (id) => {
  const amenity = await getAmenityById(id);
  return !!amenity;
};

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const amenities = await getAmenities(name);
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    if (amenity) {
      res.status(200).json(amenity);
    } else {
      res.status(404).json({ message: `Amenity with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.param("id", async (req, res, next, id) => {
  try {
    const exists = await amenityExists(id);
    if (!exists) {
      return res
        .status(404)
        .json({ message: `Amenity with id ${id} does not exist` });
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Name is required to create a amenity" });
    }

    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedAmenity = await updateAmenityById(id, name);

    if (updatedAmenity) {
      res.status(200).json(updatedAmenity);
    } else {
      res.status(404).json({ message: `Amenity with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAmenityId = await deleteAmenity(id);

    if (deletedAmenityId) {
      res.status(200).json({
        message: `Amenity with id ${deletedAmenityId} was deleted!`,
      });
    } else {
      res.status(404).json({ message: `Amenity with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

export default router;
