import { useState, useRef } from 'react';
import { HiUpload, HiX, HiCheck } from 'react-icons/hi';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { supabase } from '../../lib/supabaseClient';

export default function ImageUpload({ value, onChange, bucketFolder = 'gallery' }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    setCrop({
      unit: '%',
      x: 0,
      y: 0,
      width: 100,
      height: 100
    });
    // Ensure completedCrop is immediately set to full image
    const { width, height } = e.currentTarget;
    setCompletedCrop({
      unit: 'px',
      x: 0,
      y: 0,
      width,
      height
    });
  }

  const uploadCroppedImage = async () => {
    if (!completedCrop || !imgRef.current) return;
    
    try {
      setUploading(true);
      
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      
      const fileName = `${Math.random()}.jpg`;
      const filePath = `${bucketFolder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      onChange(data.publicUrl);
      setImgSrc('');
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(file);
    }
  };

  if (imgSrc && !value) {
    return (
      <div className="w-full relative bg-black rounded-xl border border-brand-green/30 p-4">
        <div className="w-full flex justify-center bg-black/50 p-2 rounded-lg">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              onLoad={onImageLoad}
              style={{ maxHeight: '60vh', width: 'auto', display: 'block' }}
            />
          </ReactCrop>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setImgSrc('')}
            className="bg-red-500 hover:bg-red-600 text-white p-2 px-4 rounded-full shadow-lg font-bold flex items-center gap-2"
          >
            <HiX size={20} /> Cancel
          </button>
          <button
            type="button"
            onClick={uploadCroppedImage}
            disabled={uploading || !completedCrop?.width}
            className="bg-brand-green hover:bg-brand-lightGreen text-white p-2 px-4 rounded-full shadow-lg font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
               <><HiCheck size={20} /> Crop & Upload</>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-brand-green/30 aspect-video bg-black/50 flex items-center justify-center">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button"
              onClick={() => onChange('')}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging ? 'border-brand-gold bg-brand-gold/10' : 'border-gray-600 hover:border-brand-green hover:bg-brand-green/5'
          }`}
        >
          <input 
            type="file" 
            accept="image/*"
            onChange={onSelectFile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          <HiUpload size={32} className="mx-auto mb-4 text-gray-400" />
          <p className="text-sm font-medium text-gray-300">
            Click or drag and drop to select
          </p>
          <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
        </div>
      )}
    </div>
  );
}
