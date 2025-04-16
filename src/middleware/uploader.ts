import multer from "multer";

export const uploaderMemory = () => {
  return multer({ storage: multer.memoryStorage() });
};
