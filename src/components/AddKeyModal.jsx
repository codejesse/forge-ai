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
import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

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
                  <div className="w-full max-w-lg">
                    <Field>
                      <Input
                        placeholder="Enter api key"
                        className={clsx(
                          "mt-3 block w-full rounded-lg border bg-white py-1.5 px-3 text-sm/6 text-black",
                          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        )}
                      />
                    </Field>
                  </div>
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
