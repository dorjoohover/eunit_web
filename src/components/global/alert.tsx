import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

const Alerting = ({
  btn,
  onClick = () => {},
  bg = "bg-red-500 hover:bg-red-900",
  body,
  isDelete = "",
  title = "Зар",
}: {
  title?: string;
  isDelete?: string;
  body?: ReactNode;
  bg?: string;
  onClick?: () => void;
  btn?: ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button className={mergeNames(STYLES.button, bg)} onClick={onOpen}>
        {btn}
      </button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title} {isDelete.toLowerCase()}
            </AlertDialogHeader>

            <AlertDialogBody>
              {body ?? <p>Та итгэлтэй байна уу?</p>}
            </AlertDialogBody>

            <AlertDialogFooter>
              <button
                className={mergeNames(
                  STYLES.button,
                  "bg-gray-300 hover:bg-gray-400 ml-3 px-4 py-2"
                )}
                // ref={cancelRef}
                onClick={onClose}
              >
                Цуцлах
              </button>
              <button
                className={mergeNames(
                  STYLES.button,
                  "bg-red-500 hover:bg-red-900 ml-3 px-4 py-2"
                )}
                onClick={() => {
                  onClick();
                  onClose();
                }}
              >
                {isDelete}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Alerting;
