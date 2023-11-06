import type { Common, Strapi } from "@strapi/strapi";

export type ControllerFactory = (args: { strapi: Strapi }) => Common.Controller;
