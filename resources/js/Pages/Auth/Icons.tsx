import React from 'react';
import { AiFillBank } from "react-icons/ai";
import { AiOutlineFund } from "react-icons/ai";
import { AiFillPushpin } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";

interface IconsProps {
  onAppStoreClick: () => void;
  onFundClick: () => void;
  onAssetsClick: () => void;
  onFavoritesClick: () => void;
}

const Icons: React.FC<IconsProps> = ({ onAppStoreClick, onFundClick, onAssetsClick, onFavoritesClick }) => {
  const IconWithTooltip = ({ icon, name }: { icon: React.ReactNode, name: string }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
      <div className="relative flex items-center">
        <button
          className="flex items-center"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {icon}
        </button>
        {showTooltip && (
          <div className="absolute left-full ml-2 bg-white p-2 rounded shadow-lg">
            <span>{name}</span>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-8 space-y-4 text-gray-400">
      <button onClick={onAppStoreClick}>
        <IconWithTooltip icon={<AiOutlineFund className="w-7 h-7 hover:text-gray-500" />} name="Fund" />
      </button>
      <button onClick={onFundClick}>
      <IconWithTooltip icon={<AiOutlineDollarCircle className="w-7 h-7 hover:text-gray-500" />} name="Assets" />

      </button>
      <button onClick={onFavoritesClick}>
        <IconWithTooltip icon={<AiFillPushpin className="w-7 h-7 hover:text-gray-500" />} name="Favorites" />
      </button>
      <button onClick={onAssetsClick}>
      <IconWithTooltip icon={<AiFillBank className="w-7 h-7 hover:text-gray-500" />} name="AppStore" />

      </button>

    </div>
  );
};

export default Icons;
