"use client";
import { sendFeedback } from "@/app/(api)/user.api";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { FeedbackType } from "@/utils/type";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import { useState } from "react";

const Feedback = ({
  openFeedback = "py-2 font-semibold border-2 border-gray-200 rounded-md",
}) => {
  const  [opened, { open, close }] = useDisclosure();

  const [feedback, setFeedback] = useState<FeedbackType>({
    title: "",
    message: "",
  });

  const send = async () => {
    await sendFeedback(feedback.title, feedback.message).then((d) => {
      if (d) {
        notifications.show({
          message: "Баярлалаа",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
        close();
      }
    });
  };

  return (
    <>
      <button className={openFeedback} onClick={open}>
        Санал хүсэлт
      </button>

      <Modal size={"lg"} onClose={close} opened={opened} centered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Санал хүсэлт</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-2 gap-2 ">
              <div className="flex flex-col gap-1 col-span-full">
                <h1>Гарчиг</h1>
                <input
                  type="text"
                  className={mergeNames(STYLES.input, "rounded-md")}
                  onChange={(e) => {
                    setFeedback((prev) => ({ ...prev, title: e.target.value }));
                  }}
                />
              </div>

              <div className="flex flex-col gap-1 col-span-full">
                <h1>Дэлгэрэнгүй</h1>
                <textarea
                  className={mergeNames(STYLES.input, "rounded-md ")}
                  onChange={(e) =>
                    setFeedback((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </ModalBody>
          {/* <ModalFooter className="flex justify-between w-full gap-2">
            <button
              onClick={onClose}
              className={mergeNames(
                "p-2 px-3 rounded-md bg-white border-2 border-gray-400 font-bold text-gray-500"
              )}
            >
              Буцах
            </button>
            <button
              className={mergeNames(STYLES.blueButton, "p-2 px-3 rounded-md")}
              onClick={() => send()}
            >
              Илгээх
            </button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Feedback;
