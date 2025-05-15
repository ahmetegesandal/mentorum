import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file = files.file instanceof Array ? files.file[0] : files.file;
    if (!file || !file.filepath) {
      console.error("📛 Dosya eksik veya filepath tanımsız:", file);
      return res.status(400).json({ error: 'No valid file uploaded' });
    }

    const fileUrl = `/uploads/${path.basename(file.filepath)}`;
    const mime = file.mimetype || '';
    let previewType = 'file';

    if (mime.startsWith('image/')) previewType = 'image';
    else if (mime.startsWith('video/')) previewType = 'video';
    else if (mime.startsWith('audio/')) previewType = 'audio';

    return res.status(200).json({
      url: fileUrl,
      name: file.originalFilename,
      previewType,
    });
  });
}
