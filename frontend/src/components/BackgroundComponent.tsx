import React, { FC } from 'react';

interface BackgroundColorPickerProps {
  onBackgroundColorChange: (color: string) => void;
}

const BackgroundColorPicker: FC<BackgroundColorPickerProps> = ({ onBackgroundColorChange }) => {
  return (
    <div>
      <label htmlFor='bg-color' className='text-semibold'>Background Color</label>
      <input
        type="color"
        onChange={(e) => onBackgroundColorChange(e.target.value)}
        id="bg-color"
        className='rounded-[50%] h-[20px] w-[20px]'
      />
    </div>
  );
};

export default BackgroundColorPicker;
