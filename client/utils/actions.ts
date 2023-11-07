import pluginId from "../../pluginId.json";
import actions from "../../actions.json";

type ActionUid = keyof typeof actions

export function getActionUid(uid: ActionUid) {
  return `plugin::${pluginId}.${uid}`;
}
