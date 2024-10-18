export const optimizeImage = async (file: any, size: number, quality?: number) => {
  size ??= 256;
  if (!quality) quality = 1;
  if (quality < 0.1) quality = 0.1;
  if (quality > 1) quality = 1;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx)
    return new Promise<Blob>((_resolve, reject) => {
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
      quality
    );
  });
  return promise;
};
