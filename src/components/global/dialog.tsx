import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { useDisclosure } from "@mantine/hooks";

import { ReactNode, useRef } from "react";

function DialogBox({
  btnDialog,
  dlHeader,
  dlBody,
  onClick,
}: {
  btnDialog: ReactNode;
  dlHeader: ReactNode;
  dlBody: ReactNode;
  onClick: () => void;
}) {
  const  [opened, { open, close }] = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex cursor-pointer" onClick={open}>
        {btnDialog}
      </div>
      {/* <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{dlHeader}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{dlBody}</AlertDialogBody>
          <AlertDialogFooter>
            <button
              className="px-4 py-2 rounded-lg bg-grey/20"
              onClick={onClose}
            >
              Буцах
            </button>

            <button
                  className={mergeNames(STYLES.blueButton, "px-4 py-1 ml-3")}
                  onClick={() => {
                    onClick();
                    onClose()
                  }}
                >
                  Тийм
                </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}

export default DialogBox;
