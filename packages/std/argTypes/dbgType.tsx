import { ReactNode } from "react";
import { argType, implicitCast } from "../lib";
import { boolType, numberType, renderableType, stringType } from "./primitives";
import { arrayType } from "./arrayType";
import { anyType } from "./anyType";
import { unionType } from "./unionType";
import { Box, Table } from "@mui/joy";

type DbgTypeValue = DbgTypeValueContainer;

export const dbgType = argType<DbgTypeValue>({
  id: "dbg",
  name: "Debug type",
  color: "purple",
  testValue: x =>
    x === null ||
    x === undefined ||
    x === true ||
    x === false ||
    typeof x === "number" ||
    typeof x === "string" ||
    x instanceof DbgTypeValueContainer
});

export const dbgTypeImplicitCasts = [
  implicitCast(stringType, dbgType, x => new DbgTypeValueContainer(x)),
  implicitCast(boolType, dbgType, x => new DbgTypeValueContainer(x)),
  implicitCast(numberType, dbgType, x => new DbgTypeValueContainer(x)),
  implicitCast(
    arrayType(arrayType(renderableType)),
    dbgType,
    x => new DbgTypeValueContainer(
      x && (
        <Box sx={{ overflowX: "scroll" }}>
          <Table sx={{ background: "black", width: "initial" }}>
            {x[0] && (
              <>
                <thead>
                  <tr>
                    {x[0].map((c, i) => <th key={i}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {x.slice(1).map((r, i) => (
                    <tr key={i}>
                      {r.map((c, ii) => <td key={ii}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </Table>
        </Box>
      ),
      true
    )
  )
];

export class DbgTypeValueContainer {
  public readonly value: ReactNode;
  public readonly full: boolean;

  public constructor (value: ReactNode, full: boolean = false) {
    this.value = value;
    this.full = full;
  }
}
