import { exec } from "child_process";
import { mkdir, readFileSync } from "fs";
import { join } from "path";
import { promisify } from "util";

const _execa = promisify(exec);
const _mkdir = promisify(mkdir);

export async function execa(command: string) {
  const stds = await _execa(command)
  console.info({ command, ...stds })
  return stds
}

export async function mkdirp(path: string) {
  let success = false

  return _mkdir(path, { recursive: true })
    .then(() => success = true)
    .catch(() => success = false)
    .finally(() => success)
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
