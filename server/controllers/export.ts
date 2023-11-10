import { randomUUID } from "crypto";
import { createReadStream } from "fs";
import { join } from "path";

import pluginId from "../../pluginId.json";

import { getProjectName, mkdirp, withExt } from "../utils";

import type { ControllerFactory } from "./types";

const ARCHIVE_DIR = "./.tmp/";

export const exportController: ControllerFactory = ({ strapi }) => ({
  async handler(ctx) {
    try {
      const optionsEnabled = strapi
        .plugin(pluginId)
        .service("export")
        .opts((ctx.query.opts?.toString() ?? "").split(","));

      if (optionsEnabled.length === 0) {
        throw new Error("nothing enabled to export");
      }

      await mkdirp(ARCHIVE_DIR);
      const filePath = join(ARCHIVE_DIR, randomUUID());

      const archiveName = strapi
        .plugin(pluginId)
        .config("archiveName", getProjectName() ?? "export");

      const fileName = [
        archiveName,
        optionsEnabled.join("-"),
        new Date().toISOString(),
      ].join("-");

      const encryptionKey = strapi
        .plugin(pluginId)
        .config("encryptionKey", undefined);

      const success = await strapi
        .plugin(pluginId)
        .service("export")
        .run(filePath, optionsEnabled, encryptionKey);

      if (!success) throw new Error("file not exported by strapi");

      // download file
      ctx.attachment(withExt(fileName, !!encryptionKey));
      ctx.set("access-control-expose-headers", "content-disposition");
      ctx.set(
        "content-disposition",
        `attachment; filename=${withExt(fileName, !!encryptionKey)}`
      );
      ctx.set("content-type", "application/tar+gzip");
      ctx.body = createReadStream(withExt(filePath, !!encryptionKey));
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = `${err}`
      throw err;
    }
  },
});
