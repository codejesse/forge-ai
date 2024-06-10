import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { KeyRounded } from "@mui/icons-material";
import { useState } from "react";

export default function AddKeyModal() {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      {/* <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button> */}
      <KeyRounded className="cursor-pointer" onClick={open} />

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h2"
                    className="text-[30px] font-inter font-medium text-black"
                  >
                    Add api key
                  </DialogTitle>
                  <p className="mt-2 font-inter text-sm/6 text-[#92959E]">
                    You can add your own gemini api key to keep the app working
                  </p>
                  <div className="mt-4">
                    <Button
                      className="text-center gap-2 rounded-full bg-[#0B4AEB] w-full py-1.5 px-3 text-sm/6 text-white font-inter font-normal"
                      onClick={close}
                    >
                     Update api key
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
