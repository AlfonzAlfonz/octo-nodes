export const downloadImage = (width: number, height: number, svg: SVGSVGElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.background = "white";
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const img = document.createElement("img");
  img.width = canvas.width * window.devicePixelRatio;
  img.height = canvas.height * window.devicePixelRatio;
  img.style.background = "white";

  const ctx = canvas.getContext("2d")!;

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
    downloadURI(canvas.toDataURL("image/png"), "img.png");
  };

  img.src = svgDataURL(svg);
};

const svgDataURL = (svg: SVGSVGElement) => {
  const svgAsXML = new XMLSerializer().serializeToString(svg);
  return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
};

const downloadURI = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
};
