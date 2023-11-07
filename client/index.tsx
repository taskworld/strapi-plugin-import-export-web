import pluginId from "../pluginId.json";

import { getActionUid } from "./utils/actions";

export default {
  bootstrap(app: any) {
    app.addSettingsLink("global", {
      id: pluginId,
      to: `/settings/${pluginId}/`,
      intlLabel: {
        id: "import-export-web.link",
        defaultMessage: "Import/Export",
      },
      Component: async () =>
        import(
          /* webpackChunkName: "import-export-web-settings-page" */ "./pages/Settings"
        ),
      permissions: [
        {
          action: getActionUid('import'),
          subject: null,
        },
        {
          action: getActionUid('export'),
          subject: null,
        },
      ],
    });
  },

  register(app: any) {},
  async registerTrads(app: any) {
    return [];
  },
};
