import { argType, implicitCast } from "../lib";
import { DbgTypeValueContainer, dbgType } from "./dbgType";
import { renderableType } from "./primitives";

export const imageType = argType<ImageTypeValue>({
  id: "image",
  name: "Image",
  color: "white",
  testValue: x => x instanceof ImageTypeValue
});

export const imageImplicitCasts = [
  implicitCast(imageType, renderableType, img => <image href={img.data} />),
  implicitCast(imageType, dbgType, img => new DbgTypeValueContainer(
    <>
      <pre>
        {JSON.stringify(img, null, 2)}
      </pre>
      {img.data && <img src={img.data} alt="Image preview" />}
    </>
  ))
];

export class ImageTypeValue {
  readonly src: string;
  readonly data: string;

  constructor (src: string, data: string) {
    this.src = src;
    this.data = data;
  }
}
