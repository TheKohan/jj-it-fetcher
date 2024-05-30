import { Hono } from "hono";
import { offersController } from "../controllers/offers";

const api = new Hono();

const { getNewOffersController } = offersController;

api.get("/new", getNewOffersController);

export const offersRouter = api;
