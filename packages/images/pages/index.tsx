import "reactflow/dist/style.css";

import { Inputs } from "@octo-nodes/std/components/Inputs";
import { NodeEditor } from "@octo-nodes/std/components/NodeEditor";
import { OctoNodesProvider } from "@octo-nodes/std/components/OctoNodesProvider";
import { Preview } from "@octo-nodes/std/components/Preview";
import { Ui } from "@octo-nodes/std/components/Ui";
import { stdLib } from "@octo-nodes/std/lib/std";
import { useOctoNodes } from "@octo-nodes/std/state";

export default function Home () {
  const octoNodes = useOctoNodes(stdLib);
  return (
    <OctoNodesProvider value={octoNodes}>
      <Ui
        inputs={<Inputs />}
        editor={<NodeEditor />}
        preview={<Preview />}
      />
    </OctoNodesProvider>
  );
}
