export const optimizeImage = async (file: any, size: number) => {
  size ??= 256;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx)
    return new Promise<Blob>((resolve, reject) => {
      reject("unable to get context");
    });

  canvas.width = size;
  canvas.height = size;

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const ratio = Math.max(size / width, size / height);

  const x = (size - width * ratio) / 2;
  const y = (size - height * ratio) / 2;

  ctx.drawImage(bitmap, 0, 0, width, height, x, y, width * ratio, height * ratio);

  const promise: Promise<Blob> = new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject("blob was null");
      },
      "image/webp",
      0.85
    );
  });
  return promise;
};
