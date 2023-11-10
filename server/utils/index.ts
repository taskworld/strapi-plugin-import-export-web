import { exec } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";
import { promisify } from "util";

const _execa = promisify(exec);

export async function execa(command: string) {
  const stds = await _execa(command)
  console.info({ command, ...stds })
  return stds
}

let pckgJsn: string | undefined;

export function getProjectName() {
  try {
    pckgJsn ??= readFileSync(join(process.cwd(), "package.json"), "utf-8");
    return JSON.parse(pckgJsn).name as string | undefined;
  } catch {
    return undefined;
  }
}

const TARBALL_EXT = ".tar.gz";
const ENCRYPTED_TARBALL_EXT = ".tar.gz.enc";

export function withExt(fileName: string, encrypted = false) {
  return fileName + (encrypted ? ENCRYPTED_TARBALL_EXT : TARBALL_EXT);
}
