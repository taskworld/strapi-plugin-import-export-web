import { FormEvent, useState } from "react";

import {
  Alert,
  Button,
  Checkbox,
  Flex,
  TextInput,
  Typography,
} from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";
import { Upload } from "@strapi/icons";

import pluginId from "../../../pluginId";

export default function Import() {
  const [configOpt, setConfigOpt] = useState(false);
  const [contentOpt, setContentOpt] = useState(false);
  const [filesOpt, setFileOpt] = useState(false);

  const [busy, setBusy] = useState(false);
  const { post } = useFetchClient();

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    try {
      setBusy(true);
      const res = await post(
        `/${pluginId}`,
        new FormData(evt.target as HTMLFormElement),
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
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
      alignItems="stretch"
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
        Import
      </Typography>

      <form onSubmit={onSubmit}>
        <Flex direction="column" alignItems="start" gap={4}>
          <TextInput
            placeholder="Pick a tarball"
            label="Strapi archive"
            type="file"
            name="archive"
            required
          />

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
            startIcon={<Upload />}
          >
            Upload archive
          </Button>

          <div>
            <Typography fontSize="sm" textColor="neutral400">
              Once submitted, the file will be processed and{" "}
              <Typography textColor="neutral600">
                <Typography fontWeight="bold">
                  the database will be purged.
                </Typography>
              </Typography>
              <br />
              Be sure to check twice before processing any further.
            </Typography>
          </div>
        </Flex>
      </form>
    </Flex>
  );
}
