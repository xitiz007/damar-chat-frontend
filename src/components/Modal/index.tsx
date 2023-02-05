import { XMarkIcon } from "@heroicons/react/24/solid";
interface Props {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<Props> = ({ children, onClose, title }) => {
  return (
    <div className="absolute z-20 w-full h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="bg-gray-200 w-[400px] p-4 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-black">{title}</p>
            <div
              onClick={onClose}
              className="cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-in-out rounded-full p-2"
            >
              <XMarkIcon className="text-black w-6" />
            </div>
          </div>
          <div className="bg-gray-100 h-[2px] my-4" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
