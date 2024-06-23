// components/PopupText.tsx
import { useState, useEffect } from 'react';

interface PopupTextProps {
  message: string;
  show: boolean;
  duration?: number; // Optional duration prop to control how long the popup is shown
}

const PopupText: React.FC<PopupTextProps> = ({ message, show, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) {
      setVisible(true);
      timer = setTimeout(() => setVisible(false), duration); // Hide after the specified duration
    } else {
      setVisible(false);
    }

    // Clear the timer if the component unmounts or the effect reruns
    return () => clearTimeout(timer);
  }, [show, duration]);

  if (!visible) return null;

  return (
    <div className="animate-fadeInOut-quick fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-base font-bold text-slate-900 p-3 rounded-md border-2 border-slate-900 shadow-lg z-10">
      {message}
    </div>
  );
};

export default PopupText;