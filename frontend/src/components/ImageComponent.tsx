import React, { useState, FC } from 'react';

interface ImageComponentProps {
  onImageAdd: (url: string) => void;
}

const ImageComponent: FC<ImageComponentProps> = ({ onImageAdd }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleAddImage = () => {
    if (imageUrl) {
      onImageAdd(imageUrl);
      setImageUrl('');
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL"
        className='border-2 p-2 rounded-md w-[300px]'
      />
      <button onClick={handleAddImage} className='leading-center p-2 rounded-md bg-gray-400 font-semibold text-center text-white'>
        add
      </button>
    </div>
  );
};

export default ImageComponent;
