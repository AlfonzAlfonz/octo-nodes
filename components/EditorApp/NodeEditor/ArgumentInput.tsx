import { FormLabel, Input as FormInput } from "@mui/joy";
import { Dispatch, FC } from "react";

import { Arg } from "../model";
import { ArgType, intType, numberType, stringType, tupleType } from "../SVGRenderer/args";
import { validateValue } from "../utils";

interface Props {
  value?: string;
  argDeclaration: Arg;

  setValue: Dispatch<string | number>;
}

export const ArgumentInput: FC<Props> = (p) => {
  return (
    <>
      {[
        isNumberType(p.argDeclaration) && <NumberInput {...p} argDeclaration={p.argDeclaration} />,
        isStringType(p.argDeclaration) && <TextInput {...p} argDeclaration={p.argDeclaration} />
        // isTuppleType(p.argDeclaration) &&
        //   <TextInput {...p} argDeclaration={p.argDeclaration} />
      ].find(Boolean) ?? <FormLabel>{p.argDeclaration.name}</FormLabel>}
    </>
  );
};

const TextInput: FC<Props & { argDeclaration: Arg<string> }> = ({ value, argDeclaration, setValue }) => {
  return (
    <FormInput
      value={validateValue(argDeclaration, value) ?? ""}
      placeholder={`${argDeclaration.defaultValue ?? ""}`}
      onChange={e => setValue(e.target.value)}
      size="sm"
      startDecorator={argDeclaration.name}
    />
  );
};

const NumberInput: FC<Props & { argDeclaration: Arg<number> }> = ({ value, argDeclaration, setValue }) => {
  return (
    <FormInput
      type="number"
      value={validateValue(argDeclaration, value) ?? ""}
      placeholder={`${argDeclaration.defaultValue ?? ""}`}
      onChange={e => {
        const v = +e.target.value;
        if (Object.is(v, NaN)) return;
        setValue(v);
      }}
      size="sm"
      startDecorator={argDeclaration.name}
    />
  );
};

const isNumberType = (a: Arg): a is Arg<number> => a.type === intType || a.type === numberType;
const isStringType = (a: Arg): a is Arg<string> => a.type === stringType;
const isTuppleType = (a: Arg): a is Arg<ArgType<unknown>[]> => a.type === tupleType as any;
