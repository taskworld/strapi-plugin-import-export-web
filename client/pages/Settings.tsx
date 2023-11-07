import {
  ContentLayout,
  HeaderLayout,
  Flex,
  Main,
} from "@strapi/design-system";

import { SettingsPageTitle } from "@strapi/helper-plugin";

import ImportCard from "./Import";
import ExportCard from "./Export";

export default function Settings() {
  return (
    <Main>
      <SettingsPageTitle name="Import/Export" />
      <HeaderLayout
        title="Import/Export"
        subtitle="Utilities to recover your Strapi instance"
      />
      <ContentLayout>
        <Flex direction="column" alignItems="stretch" gap={6}>
          <ImportCard />
          <ExportCard />
        </Flex>
      </ContentLayout>
    </Main>
  );
}
