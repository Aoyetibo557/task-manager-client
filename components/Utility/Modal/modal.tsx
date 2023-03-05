import { Transition, Dialog } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { ReactElement } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
  title?: string | ReactElement;
  width?: string;
  theme?: string;
};

const Modal = ({ children, setOpen, open, title, width, theme }: Props) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                className={`w-full ${
                  width ? width : "max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                } transform overflow-hidden rounded-md  p-6 text-left align-middle shadow-xl transition-all ${
                  theme === "light"
                    ? "bg-task-light-white"
                    : "bg-task-sidebar-dark"
                }`}>
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
