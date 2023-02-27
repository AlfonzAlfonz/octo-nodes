import "reactflow/dist/style.css";

import { EditorApp } from "@octo-nodes/std/components/EditorApp";
import { stdLib } from "@octo-nodes/std/lib";

export default function Home () {
  return (
    <EditorApp lib={stdLib} />
  );
}
