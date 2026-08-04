import cloudinary from '../config/cloudinary.js';
import sharp from 'sharp';
import { PassThrough } from 'stream';

export default class ImageUploader {
  cloudinaryUpload = (imgType) => (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No image uploaded.' });
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder: imgType,
          public_id: `${imgType}_${req.params.id}`,
          overwrite: true,
          fetchFormat: 'auto',
          quality: 'auto',
          flags: 'strip_profile'
        },
        (error, uploadResult) => {
          if (error) return res.status(500).json({ message: error.message });
          req.body.url = uploadResult.secure_url;
          req.body.public_id = uploadResult.public_id;
          next();
        }
      );
      const transformer = sharp()
        .resize(800, 800, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFormat('webp' , { quality: 80 });
      const bufferStream = new PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(transformer).pipe(cloudinaryStream);
      transformer.on('error', (err) => {
        res.status(500).json({ message: err.message });
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  cloudinaryUploads = (fieldFolderMap) => (req, res, next) => {
    try {
      if (!req.files) return res.status(400).json({ message: 'No files uploaded.' });
      const fieldNames = Object.keys(fieldFolderMap);
      const uploadPromises = fieldNames.map(fieldName => {
        const files = req.files[fieldName];
        if (!files || files.length === 0) return Promise.resolve(null);
        const folder = fieldFolderMap[fieldName];
        const file = files[0];
        return new Promise((resolve, reject) => {
          const cloudinaryStream = cloudinary.uploader.upload_stream(
            {
              folder: folder,
              public_id: `${fieldName}_${req.params.id}`,
              overwrite: true,
              fetchFormat: 'auto',
              quality: 'auto',
              flags: 'strip_profile'
            },
            (error, result) => {
              if (error) return reject(error);
              req.body[fieldName] = {
                url: result.secure_url,
                public_id: result.public_id
              }
              resolve(result);
            }
          );
          const transformer = sharp()
            .resize(800, 800, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .toFormat('webp' , { quality: 80 });
          const bufferStream = new PassThrough();
          bufferStream.end(file.buffer);
          bufferStream.pipe(transformer).pipe(cloudinaryStream);
        });
      });
      Promise.all(uploadPromises)
        .then(() => next())
        .catch(err => res.status(500).json({ message: 'Images upload failed: ' + err.message }));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}