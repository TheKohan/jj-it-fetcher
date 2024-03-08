import { Hono } from "hono";
import { offersController } from "../controllers/offers";

const api = new Hono();

const { getTodayNewOffersController } = offersController;

api.post("/today", getTodayNewOffersController);

export const offersRouter = api;
