import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useRef } from "react";

const Alerting = ({
  btn,
  onClick = () => {},
  bg = "bg-red-500 hover:bg-red-900",
  body,
  isDelete = "",
  className,
  title = "Зар",
}: {
  title?: string;
  isDelete?: string;
  body?: ReactNode;
  bg?: string;
  onClick?: () => void;
  btn?: ReactNode;
  className?: string
}) => {
  const  [opened, { open, close }]= useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button className={mergeNames(STYLES.button, bg)} onClick={open}>
        {btn}
      </button>

      {/* <AlertDialog
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
      </AlertDialog> */}
    </>
  );
};

export default Alerting;
