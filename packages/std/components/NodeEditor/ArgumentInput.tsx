import { FormLabel, Input as FormInput } from "@mui/joy";
import { Dispatch, FC } from "react";

import { Arg } from "../EditorApp/model";
import { intType, numberType, stringType, tupleType } from "../../argTypes";
import { validateValue } from "../../utils";

interface Props {
  value?: string;
  arg: Arg;

  setValue: Dispatch<string | number>;
}

export const ArgumentInput: FC<Props> = (p) => {
  return (
    <>
      {[
        isNumberType(p.arg) && <NumberInput {...p} arg={p.arg} />,
        isStringType(p.arg) && <TextInput {...p} arg={p.arg} />
        // isTuppleType(p.argDeclaration) &&
        //   <TextInput {...p} argDeclaration={p.argDeclaration} />
      ].find(Boolean) ?? <FormLabel>{p.arg.name}</FormLabel>}
    </>
  );
};

const TextInput: FC<Props & { arg: Arg<string> }> = ({ value, arg, setValue }) => {
  return (
    <FormInput
      value={validateValue(arg, value) ?? ""}
      placeholder={`${arg.defaultValue ?? ""}`}
      onChange={e => setValue(e.target.value)}
      size="sm"
      startDecorator={arg.name}
    />
  );
};

const NumberInput: FC<Props & { arg: Arg<number> }> = ({ value, arg, setValue }) => {
  return (
    <FormInput
      type="number"
      value={validateValue(arg, value) ?? ""}
      placeholder={`${arg.defaultValue ?? ""}`}
      onChange={e => {
        const v = +e.target.value;
        if (Object.is(v, NaN)) return;
        setValue(v);
      }}
      size="sm"
      startDecorator={arg.name}
    />
  );
};

const isNumberType = (a: Arg): a is Arg<number> => a.type === intType || a.type === numberType;
const isStringType = (a: Arg): a is Arg<string> => a.type === stringType;
