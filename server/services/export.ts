import { existsSync } from "fs";

import { execa, withExt } from "../utils";

import type { ServiceFactory } from "./types";

const KNOWN_OPTIONS = ["config", "content", "files"] as const;

type Option = (typeof KNOWN_OPTIONS)[number];

export const exportService: ServiceFactory = () => ({
  opts(opts: string[]) {
    return opts
      .filter((opt: any): opt is Option => KNOWN_OPTIONS.includes(opt))
      .filter((e, i, a) => a.indexOf(e) === i);
  },

  async run(filePath: string, options: Option[], encryptionKey?: string) {
    const onlyOption = `--only "${options.join(",")}"`;

    const encryptionOption = encryptionKey
      ? `--key "${encryptionKey}"`
      : "--no-encrypt";

    await execa(
      `npx strapi export --file ${filePath} ${onlyOption} ${encryptionOption}`
    );
    return existsSync(withExt(filePath, !!encryptionKey));
  },
});
