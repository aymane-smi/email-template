import React, { useState, FC } from 'react';

interface ButtonComponentProps {
  onButtonAdd: (button: { url: string, text: string, color: string, backgroundColor: string }) => void;
}

const ButtonComponent: FC<ButtonComponentProps> = ({ onButtonAdd }) => {
  const [buttonText, setButtonText] = useState('');
  const [buttonUrl, setButtonUrl] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [buttonBgColor, setButtonBgColor] = useState('#ffffff');

  const handleAddButton = () => {
    if (buttonText && buttonUrl) {
      onButtonAdd({
        url: buttonUrl,
        text: buttonText,
        color: buttonColor,
        backgroundColor: buttonBgColor,
      });
      setButtonText('');
      setButtonUrl('');
      setButtonColor('#000000');
      setButtonBgColor('#ffffff');
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <input
        type="text"
        value={buttonText}
        onChange={(e) => setButtonText(e.target.value)}
        placeholder="Button Text"
        className='border-2 p-2 rounded-md w-[300px]'
      />
      <input
        type="text"
        value={buttonUrl}
        onChange={(e) => setButtonUrl(e.target.value)}
        placeholder="Button URL"
        className='border-2 p-2 rounded-md w-[300px]'
      />
      <input
        type="color"
        value={buttonColor}
        onChange={(e) => setButtonColor(e.target.value)}
        placeholder="Text Color"
        className='rounded-[50%] w-[20px] h-[20px]'
      />
      <input
        type="color"
        value={buttonBgColor}
        onChange={(e) => setButtonBgColor(e.target.value)}
        placeholder="Background Color"
        className='rounded-[50%] w-[20px] h-[20px]'
      />
      <button onClick={handleAddButton} className='leading-center p-2 rounded-md bg-gray-400 font-semibold text-center text-white'>
        add
      </button>
    </div>
  );
};

export default ButtonComponent;
