import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormInput from "@mui/joy/Input";
import { FC } from "react";

import { numberType, stringType } from "../../argTypes";
import { isSubType, validateValue } from "../../argTypes/utils";
import { ArgDeclaration, ArgType, NodeArg, NodeValueArg } from "../../lib";
import { AnalysedArg } from "../../typeAnalysis";
import { useLib } from "../OctoNodesProvider";

interface Props<T> {
  argDeclaration: ArgDeclaration<T>;
  analysedArg: AnalysedArg<T>;
  nodeArg: NodeArg | undefined;

  setValue: (x: T, argType: ArgType<T>) => unknown;
}

interface InputProps<T> extends Omit<Props<T>, "nodeArg"> {
  nodeArg?: NodeValueArg<T>;
}

export const EditorNodeArgument: FC<Props<unknown>> = (p) => {
  if (p.nodeArg && "id" in p.nodeArg) {
    return (
      <SimpleLabel {...p} />
    );
  }

  if (isNumberType(p.analysedArg.type)) {
    return <NumberInput {...p as InputProps<number>} />;
  }

  if (isStringType(p.analysedArg.type)) {
    return <TextInput {...p as InputProps<string>} />;
  }

  return <SimpleLabel {...p} />;
};

const TextInput: FC<InputProps<string>> = ({ argDeclaration, nodeArg, setValue, analysedArg }) => {
  const lib = useLib();
  return (
    <FormControl style={analysedArg.error ? { textDecoration: "red wavy underline" } : {}}>
      <FormInput
        value={validateValue(analysedArg.type, analysedArg.type, nodeArg?.value, lib.implicitCasts) ?? ""}
        placeholder={`${argDeclaration.defaultValue ?? ""}`}
        onChange={e => setValue(e.target.value, stringType)}
        size="sm"
        startDecorator={argDeclaration.name}
      />
    </FormControl>
  );
};

const NumberInput: FC<InputProps<number>> = ({ argDeclaration, nodeArg, setValue, analysedArg }) => {
  const lib = useLib();
  return (
    <FormControl style={analysedArg.error ? { textDecoration: "red wavy underline" } : {}}>
      <FormInput
        type="number"
        value={validateValue(analysedArg.type, analysedArg.type, nodeArg?.value, lib.implicitCasts) ?? ""}
        placeholder={`${argDeclaration.defaultValue ?? ""}`}
        onChange={e => {
          const v = +e.target.value;
          if (Object.is(v, NaN)) return;
          setValue(v, analysedArg.type);
        }}
        size="sm"
        startDecorator={argDeclaration.name}
      />
    </FormControl>
  );
};

const SimpleLabel: FC<Props<unknown>> = ({ argDeclaration, analysedArg }) => {
  return (
    <FormLabel style={analysedArg.error ? { textDecoration: "red wavy underline" } : {}}>
      {argDeclaration.name}
    </FormLabel>
  );
};

const isNumberType = (a: ArgType<unknown>): a is ArgType<number> => isSubType(numberType, a, []);
const isStringType = (a: ArgType<unknown>): a is ArgType<string> => isSubType(stringType, a, []);
