"use client";
import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "~/app/_components/Button";
import { Input } from "~/app/_components/Input";

import { createAccountAction } from "./actions";
import { useParams } from "next/navigation";

export function NewAccountButton() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        onClick={openModal}
        variant="ghost"
        color="gray"
        leftIcon={<PlusIcon />}
      >
        New account
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-950 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    Create account
                  </Dialog.Title>
                  <div className="pt-4">
                    <NewAccountForm />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function NewAccountForm() {
  const params = useParams<{ id: string }>();

  return (
    <form action={createAccountAction}>
      <div className="grid gap-4">
        <input hidden name="budgetPublicId" defaultValue={params.id} />
        <Input name="accountName" label="Name" required />
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
