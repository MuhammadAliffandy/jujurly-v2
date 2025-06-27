import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppCheck from "../../atoms/AppCheck/AppCheck";
import AppButton from "../../atoms/AppButton/AppButton";
import AppPopover from "../../molecules/AppPopover/AppPopover";
import { useState } from "react";
import { Icon } from "@iconify/react";

interface AppMiniToolabrProps {
  selected?: boolean;
  className?: string;
  onClick?: () => void;
  onChecked?: (value: boolean) => void;
  onChangeCheckedMode?: (value: boolean) => void;
  onDelete?: () => void;
}

const AppMiniToolbar: React.FC<AppMiniToolabrProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContainer className="flex items-center justify-between bg-blue-300 p-2 rounded-lg">
      <AppContainer className="flex items-center gap-[10px]  ">
        {isOpen && (
          <AppCheck
            checked={props.selected}
            onChange={(e) => {
              props.onChecked?.(e.target.checked);
            }}
          />
        )}
        <h2 className="font-monserrat font-bold text-white text-[14px]">
          Your Feedback
        </h2>
      </AppContainer>
      {isOpen ? (
        <AppContainer className="flex items-center gap-[10px]">
          <Icon
            onClick={props.onDelete}
            icon="mdi:trash"
            className="bg-blue-700/30 hover:bg-blue-700/60 text-white text-[24px] rounded-md p-1 cursor-pointer"
          />
          <Icon
            onClick={() => {
              setIsOpen(false);
              props.onChangeCheckedMode?.(false);
            }}
            icon="mdi:close"
            className="bg-blue-700/30 hover:bg-blue-700/60 text-white text-[24px] rounded-md p-1 cursor-pointer"
          />
        </AppContainer>
      ) : (
        <AppPopover className="text-white">
          <AppButton
            text="Tandai"
            className="rounded-sm !p-[10px] bg-transparent !text-black font-normal font-poppins"
            onClick={() => {
              setIsOpen(true);
              props.onChangeCheckedMode?.(true);
            }}
          />
        </AppPopover>
      )}
    </AppContainer>
  );
};

export default AppMiniToolbar;
