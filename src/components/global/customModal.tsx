"use client";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@mantine/core";
import { ReactNode, useState } from "react";

function CustomModal({
  children,
  header,
  btnClose,
  btnClose2,
  btnOpen,
  alert,
  isOpen,
  onOpen,
  onClose,
  func,
  onclick,
  className = "flex items-center gap-1 px-2 py-2 text-white bg-blue-500 rounded-full",
}: {
  children: ReactNode;
  header?: string;
  onclick: () => void;
  btnClose?: ReactNode;
  btnClose2: string;
  btnOpen: ReactNode;
  onClose: () => void;
  onOpen: () => void;
  className?: string;
  isOpen: boolean;
  alert?: () => void;
  func?: () => void;
}) {
  return (
    <>
      <button onClick={onOpen} className={className}>
        {btnOpen}
      </button>
      <Modal
        onClose={onClose}
        opened={isOpen}
        centered
        // size={{ base: "sm", sm: "xl", md: "2xl", lg: "6xl", xl: "6xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            className="mb-5 w-[90%] "
            fs={{ base: "15px", lg: "22px" }}
          >
            {header}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          {/* <ModalFooter className="gap-2 font-bold bg-gray-200 rounded-b-md">
            <div
              onClick={() => {
                onClose();
                if (alert != undefined) {
                  alert();
                }
              }}
            >
              {btnClose && (
                <button
                  className="px-4 py-2 text-white bg-green-400 rounded-full"
                  // onClick={async () => await func()}
                  onClick={onclick}
                >
                  {btnClose}
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-white bg-blue-500 rounded-full"
            >
              {btnClose2}
            </button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomModal;
