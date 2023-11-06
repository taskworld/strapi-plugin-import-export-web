import type { Strapi } from "@strapi/strapi";

import actions from "./actions";
import config from "./config";
import controllers from "./controllers";
import middlewares from "./middlewares";
import policies from "./policies";
import routes from "./routes";
import services from "./services";

export default {
  config,
  controllers,
  middlewares,
  policies,
  routes,
  services,

  async bootstrap({ strapi }: { strapi: Strapi }) {
    await strapi
      .service("admin::permission")
      .actionProvider.registerMany(actions);
  },
};
