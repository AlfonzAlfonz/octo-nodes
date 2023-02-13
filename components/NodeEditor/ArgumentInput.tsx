import { FormLabel, Input as FormInput } from "@mui/joy";
import { intType, numberType, stringType, tupleType, ArgType } from "components/SVGRenderer/args";
import { ArgDeclaration, ArgValue } from "model";
import { Dispatch, FC } from "react";

interface Props {
  value?: ArgValue;
  argDeclaration: ArgDeclaration;

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

const TextInput: FC<Props & { argDeclaration: ArgDeclaration<string> }> = ({ value, argDeclaration, setValue }) => {
  return (
    <FormInput
      value={value?.value ?? ""}
      placeholder={`${argDeclaration.defaultValue ?? ""}`}
      onChange={e => setValue(e.target.value)}
      size="sm"
      startDecorator={argDeclaration.name}
    />
  );
};

const NumberInput: FC<Props & { argDeclaration: ArgDeclaration<number> }> = ({ value, argDeclaration, setValue }) => {
  return (
    <FormInput
      type="number"
      value={value?.value ?? ""}
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

const isNumberType = (a: ArgDeclaration): a is ArgDeclaration<number> => a.type === intType || a.type === numberType;
const isStringType = (a: ArgDeclaration): a is ArgDeclaration<string> => a.type === stringType;
const isTuppleType = (a: ArgDeclaration): a is ArgDeclaration<ArgType<unknown>[]> => a.type === tupleType as any;
