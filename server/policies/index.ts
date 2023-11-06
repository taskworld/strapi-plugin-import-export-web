import type { Common } from "@strapi/strapi";

import pluginId from "../../pluginId";

import { IMPORT, EXPORT, getActionUid } from "../actions";

const hasServiceToken: Common.Policy = (ctx, cfg, { strapi }) => {
  const serviceToken = strapi
    .plugin(pluginId)
    .config<unknown, string | undefined>("serviceToken");

  return (
    !!serviceToken && ctx.req.headers.authorization === `Bearer ${serviceToken}`
  );
};

const canImport: Common.Policy = (ctx) => {
  return ctx.state.userAbility.can(getActionUid(IMPORT));
};

const canExport: Common.Policy = (ctx) => {
  return ctx.state.userAbility.can(getActionUid(EXPORT));
};

export default {
  canImport,
  canExport,
  hasServiceToken,
};
