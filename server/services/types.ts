import type { Common, Strapi } from "@strapi/strapi";

export type ServiceFactory = (args: { strapi: Strapi }) => Common.Service;
