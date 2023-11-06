import pluginId from "../../pluginId";

type Action = {
  section: string;
  displayName: string;
  uid: string;
  pluginName: string;
};

export const IMPORT: Action = {
  section: "plugins",
  displayName: "Import",
  uid: "import",
  pluginName: pluginId,
};

export const EXPORT: Action = {
  section: "plugins",
  displayName: "Export",
  uid: "export",
  pluginName: pluginId,
};

export function getActionUid(action: Action) {
  return `plugin::${action.pluginName}.${action.uid}`;
}

export default [IMPORT, EXPORT] as Action[];
