import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { cn } from "../../app/utils/cn";

const Modal = ({
  title,
  children,
  open,
  classNameModal,
}: {
  title: string;
  children: ReactNode;
  open: boolean;
  classNameModal?: string;
}) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black-0/90 fixed inset-0 data-[state=open]:animate-overlayShow blur-md z-10" />
        <Dialog.DialogTitle>{title}</Dialog.DialogTitle>
        <Dialog.Content
          aria-describedby="Modal"
          aria-description={title}
          className={cn(
            "fixed top-[50%] left-[50%] h-full w-full md:max-h-auto md:h-auto md:w-[90vw] medium:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#151513] p-[25px]  focus:outline-none data-[state=open]:animate-contentShow z-10",

            classNameModal
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
