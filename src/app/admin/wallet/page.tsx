"use client";
import { useAppContext } from "@/app/_context";
import WHistory from "@/components/account/wallet/history";
import WalletCard from "@/components/account/wallet/walletCard";
import { ContainerX } from "@/components/container";
import DialogBox from "@/components/global/dialog";
import { UserModel } from "@/models/user.model";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminWalletPage = () => {
  const [point, setPoint] = useState({
    email: "",
    point: "",
    message: "",
    type: "default",
  });
  const toast = useToast();
  const router = useRouter();
  const sendPoint = async () => {
    // try {
    //   if (token && point.email && point.point) {
    //     await axios
    //       .get(
    //         `${
    //           urls["test"]
    //         }/user/point/${point.email.toLowerCase()}/${parseFloat(
    //           point.point
    //         )}/${point.type}/{message}?message=${point.message}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Access-Control-Allow-Headers": "*",
    //           },
    //         }
    //       )
    //       .then((d) => {
    //         if (d.data.message == "success") {
    //           toast({
    //             title: "Амжилттай илгээлээ.",
    //             status: "success",
    //             duration: 1000,
    //             isClosable: true,
    //           });
    //         }
    //         if (d.data.message == "not found receiver") {
    //           toast({
    //             title: "Хүлээн авагч олдсонгүй",
    //             status: "warning",
    //             duration: 1000,
    //             isClosable: true,
    //           });
    //         }
    //         if (d.data.message == "not enough points") {
    //           toast({
    //             title: "Үлдэгдэл хүрэлцэхгүй байна",
    //             status: "warning",
    //             duration: 1000,
    //             isClosable: true,
    //           });
    //         }
    //         router.reload();
    //       });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const txthover =
    "font-semibold text-gray-500 duration-100 hover:text-gray-800";
  return (
    <ContainerX className="min-h-[80vh]">
      <div className="flex flex-col gap-10">
        <div
          className={mergeNames(
            "grid xl:grid-cols-2 max-w-[800px] w-full grid-cols-1 mx-auto gap-10 mt-5"
          )}
        >
          {/* Card */}
          <WalletCard />

          <form className="flex flex-col justify-center w-full gap-2 mx-auto">
            <input
              type="email"
              placeholder="Шилжүүлэх хүний и-мэйл"
              className={mergeNames(STYLES.input, "w-full rounded-md")}
              onChange={(e) => {
                setPoint((prev) => ({ ...prev, email: e.target.value }));
              }}
              required
            />

            <input
              type="number"
              placeholder="Дүн"
              className={mergeNames(STYLES.input, "w-full rounded-md")}
              onChange={(e) => {
                setPoint((prev) => ({ ...prev, point: e.target.value }));
              }}
              required
            />

            <textarea
              placeholder="Мэссэж"
              maxLength={30}
              className={mergeNames(
                STYLES.input,
                "rounded-md col-span-full resize-none"
              )}
              onChange={(e) => {
                setPoint((prev) => ({ ...prev, message: e.target.value }));
              }}
              required
            />

            <DialogBox
              onClick={() => {}}
              btnDialog={
                <div
                  className={mergeNames(
                    STYLES.blueButton,
                    "text-center w-full p-2"
                  )}
                >
                  Шилжүүлэх
                </div>
              }
              dlHeader="Та шилжүүлэхдээ итгэлтэй байна уу?"
              dlBody={
                <>
                  <p className={mergeNames(STYLES.flexBetween, "w-full")}>
                    Шилжүүлэх хүний и-мэйл:
                    <span className="font-bold">
                      {point.email}
                      {point.email.length == 0 && "И-мэйлээ оруулна уу"}
                    </span>
                  </p>
                  <p className={mergeNames(STYLES.flexBetween, "w-full")}>
                    Дүн:
                    <span className="font-bold">
                      {point.point}{" "}
                      {point.point.length == 0 && "Дүнгээ оруулна уу"}
                    </span>
                  </p>
                  <p className={mergeNames(STYLES.flexBetween, "w-full")}>
                    Мэссэж: <span className="font-bold">{point.message}</span>
                  </p>
                </>
              }
              //   dlFooter={
              //     <>
              //       <button
              //         className={mergeNames(STYLES.blueButton, "px-4 py-1 ml-3")}
              //         ml={3}
              //         onClick={() => sendPoint()}
              //       >
              //         Тийм
              //       </button>
              //     </>
              //   }
            />
          </form>
          {/* <WalletForm onClick={() => sendPoint()} /> */}
        </div>
        <WHistory />
      </div>
    </ContainerX>
  );
};
export default AdminWalletPage;
