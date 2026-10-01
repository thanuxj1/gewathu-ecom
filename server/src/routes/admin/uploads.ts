import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../../middleware/auth.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDir = path.resolve(dirname, "../../../public/uploads");

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => cb(null, `${randomUUID()}${EXTENSION_BY_TYPE[file.mimetype] ?? ""}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      cb(new Error("Only JPG, PNG, WEBP or GIF images are allowed"));
      return;
    }
    cb(null, true);
  },
});

export const adminUploadsRouter = Router();
adminUploadsRouter.use(requireAdmin);

adminUploadsRouter.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      const message = err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE"
        ? "Image must be smaller than 5MB"
        : err.message || "Could not upload image";
      res.status(400).json({ error: message });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "No image received" });
      return;
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});
