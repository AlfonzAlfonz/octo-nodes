import { argType, implicitCast } from "../lib";
import { renderableType } from "./primitives";

export const imageType = argType<ImageTypeValue>({
  id: "image",
  name: "Image",
  color: "white",
  testValue: x => x instanceof ImageTypeValue
});

export const imageImplicitCasts = [
  implicitCast(imageType, renderableType, img => <image href={img.data} />)
];

export class ImageTypeValue {
  readonly src: string;
  readonly data: string;

  constructor (src: string, data: string) {
    this.src = src;
    this.data = data;
  }
}
