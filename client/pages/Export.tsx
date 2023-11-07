import { FormEvent, useState } from "react";

import { Button, Checkbox, Flex, Typography } from "@strapi/design-system";

import { useFetchClient } from "@strapi/helper-plugin";

import { Download } from "@strapi/icons";

import pluginId from "../../pluginId.json";

function getAttachmentName(contentDispositionHeader: string = "") {
  const val = new URLSearchParams(
    contentDispositionHeader.replace("attachment;", "").trim()
  );

  return val.get("filename");
}

function downloadFile(name: string, blob: Blob) {
  const anchorEl = document.createElement("a");
  anchorEl.href = URL.createObjectURL(blob);
  anchorEl.download = name;

  document.body.appendChild(anchorEl);
  anchorEl.click();

  setTimeout(function () {
    window.URL.revokeObjectURL(anchorEl.href);
    document.body.removeChild(anchorEl);
  }, 200);
}

export default function Export() {
  const [configOpt, setConfigOpt] = useState(true);
  const [contentOpt, setContentOpt] = useState(true);
  const [filesOpt, setFileOpt] = useState(true);

  const [busy, setBusy] = useState(false);
  const { get } = useFetchClient();

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    try {
      const opts = Object.entries({
        config: configOpt,
        content: contentOpt,
        files: filesOpt,
      })
        .filter(([_, v]) => v)
        .map(([k]) => k)
        .join(",");

      setBusy(true);
      const res = await get(`/${pluginId}?opts=${opts}`, {
        responseType: "blob",
      });

      downloadFile(
        getAttachmentName(res.headers["content-disposition"]) ??
          "unknown-file.tar.gz",
        res.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Flex
      direction="column"
      alignItems="start"
      gap={4}
      hasRadius
      background="neutral0"
      shadow="tableShadow"
      paddingTop={6}
      paddingBottom={6}
      paddingRight={7}
      paddingLeft={7}
    >
      <Typography variant="delta" as="h3">
        Export
      </Typography>

      <form onSubmit={onSubmit}>
        <Flex direction="column" alignItems="start" gap={4}>
          <Flex direction="row" alignItems="start" gap={4}>
            <Checkbox
              name="config"
              value={configOpt}
              onValueChange={setConfigOpt}
            >
              config
            </Checkbox>
            <Checkbox
              name="content"
              value={contentOpt}
              onValueChange={setContentOpt}
            >
              content
            </Checkbox>
            <Checkbox name="files" value={filesOpt} onValueChange={setFileOpt}>
              files
            </Checkbox>
          </Flex>

          <Button
            type="submit"
            variant="primary"
            disabled={busy}
            loading={busy}
            startIcon={<Download />}
          >
            Download archive
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
