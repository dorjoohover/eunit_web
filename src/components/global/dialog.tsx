import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex cursor-pointer" onClick={onOpen}>
        {btnDialog}
      </div>
      <AlertDialog
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
      </AlertDialog>
    </>
  );
}

export default DialogBox;
