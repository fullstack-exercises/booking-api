import { Router } from "express";

// Services
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const amenities = await getAmenities(name);
  res.status(200).json(amenities);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newAmenity = await createAmenity(name);
  res.status(201).json(newAmenity);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedAmenity = await updateAmenityById(id, name);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAmenityId = await deleteAmenity(id);

    res.status(200).json({
      message: `Amenity with id ${deletedAmenityId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
