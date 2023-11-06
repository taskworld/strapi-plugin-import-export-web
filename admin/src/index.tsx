import pluginId from "../../pluginId";

import { IMPORT, EXPORT, getActionUid } from "../../server/actions";

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
          action: getActionUid(IMPORT),
          subject: null,
        },
        {
          action: getActionUid(EXPORT),
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
