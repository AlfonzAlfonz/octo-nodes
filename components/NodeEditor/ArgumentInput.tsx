import { FormLabel, Input as FormInput } from "@mui/joy";
import { intType, numberType, stringType } from "components/SVGRenderer/args";
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
        (p.argDeclaration.type === intType || p.argDeclaration.type === numberType) &&
          <NumberInput {...p} argDeclaration={p.argDeclaration as ArgDeclaration<number>} />,
        p.argDeclaration.type === stringType &&
          <TextInput {...p} argDeclaration={p.argDeclaration as ArgDeclaration<string>} />
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
