import pluginId from "../../pluginId.json";
import actions from "../../actions.json";

type Action = {
  section: string;
  displayName: string;
  uid: string;
  pluginName: string;
};

type ActionUid = keyof typeof actions

export function getActionUid(uid: ActionUid) {
  return `plugin::${pluginId}.${uid}`;
}

export function getAction(uid: ActionUid): Action {
  return {
    uid,
    section: "plugins",
    displayName: actions[uid],
    pluginName: pluginId,
  }
}

export function getActions(): Action[] {
  return Object.keys(actions)
    .filter((key: string): key is ActionUid => true)
    .map(getAction)
}

export default getActions()
