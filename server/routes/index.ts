import pluginId from "../../pluginId.json";

export default [
  {
    method: "GET",
    path: "/",
    handler: "export.handler",
    config: {
      policies: [`plugin::${pluginId}.canExport`],
    },
  },
  {
    method: "POST",
    path: "/",
    handler: "import.handler",
    config: {
      policies: [`plugin::${pluginId}.canImport`],
    },
  },
];
