import type { Common } from "@strapi/strapi";

import pluginId from "../../pluginId.json";

import { getActionUid } from "../actions";

const hasServiceToken: Common.Policy = (ctx, cfg, { strapi }) => {
  const serviceToken = strapi
    .plugin(pluginId)
    .config<unknown, string | undefined>("serviceToken");

  return (
    !!serviceToken && ctx.req.headers.authorization === `Bearer ${serviceToken}`
  );
};

const canImport: Common.Policy = (ctx) => {
  return ctx.state.userAbility.can(getActionUid('import'));
};

const canExport: Common.Policy = (ctx) => {
  return ctx.state.userAbility.can(getActionUid('export'));
};

export default {
  canImport,
  canExport,
  hasServiceToken,
};
