import { Common } from "@strapi/strapi";

import pluginId from "../../pluginId";

export const auth: Common.MiddlewareFactory<{
  actionId: string;
}> = ({ actionId }, { strapi }) => {
  return async (ctx, next) => {
    const serviceToken = strapi
      .plugin(pluginId)
      .config<unknown, string | undefined>("serviceToken");

    // service token bypasses everything
    if (
      serviceToken &&
      ctx.req.headers.authorization === `Bearer ${serviceToken}`
    ) {
      await next();
      return;
    }

    if (ctx.state.user) {
      const hasPermission = await strapi
        .service("admin::permission")
        .hasPermissions({
          user: ctx.state.user,
          action: actionId,
          subject: null,
        });

      if (hasPermission) {
        await next();
        return;
      }
    }

    ctx.status = 403;
  };
};
