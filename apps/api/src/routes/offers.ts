import { Hono } from "hono";
import { offersController } from "../controllers/offers";

const api = new Hono();

const { getNewOffersController, getAllSearchTagsController } = offersController;

api.get("/new", getNewOffersController);
api.get("/tags", getAllSearchTagsController); //@TODO search tags should be another MVC structure

export const offersRouter = api;
