import { Router } from "express";

// Services
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";

const router = Router();

router.get("/", async (req, res) => {
  const {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
  } = req.query;
  const properties = await getProperties(
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating
  );
  res.status(200).json(properties);
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
  } = req.body;
  const newProperty = await createProperty(
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating
  );
  res.status(201).json(newProperty);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const updatedProperty = await updatePropertyById(
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPropertyId = await deleteProperty(id);

    res.status(200).json({
      message: `Property with id ${deletedPropertyId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
