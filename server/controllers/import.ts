import type { ControllerFactory } from "./types";

import { dirname, join } from "path";

import pluginId from "../../pluginId";

import { execa } from "../utils";

export const importController: ControllerFactory = ({ strapi }) => ({
  async handler(ctx) {
    try {
      // @ts-ignore files dynamically added and not in the base type
      const { body, files = {} } = ctx.request;

      const filteredBody = Object.entries(body)
        .filter(([_, v]) => v === "on")
        .map(([k]) => k);

      const optionsEnabled = strapi
        .plugin(pluginId)
        .service("export")
        .opts(filteredBody);

      const { archive } = files;

      if (!archive?.path) {
        throw new Error("missing uploaded `archive` file");
      }

      const filePath = join(dirname(archive.path), archive.name);

      const encryptionKey = strapi
        .plugin(pluginId)
        .config("encryptionKey", undefined);

      // we must rename the file bc strapi export expect a file with a tarball extension
      await execa(`mv ${archive.path} ${filePath}`);

      const success = await strapi
        .plugin(pluginId)
        .service("import")
        .run(filePath, optionsEnabled, encryptionKey);

      ctx.status = success ? 200 : 400;
    } catch (err: unknown) {
      ctx.status = 500;
      throw err;
    }
  },
});
