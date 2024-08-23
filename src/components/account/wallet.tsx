import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { Spinner, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import WalletCard from "./wallet/walletCard";
import DialogBox from "../global/dialog";
import WHistory from "./wallet/history";
import { getUser, sendPointByUser } from "@/app/(api)/user.api";
import { PointTitle } from "@/config/enum";
import { ErrorMessages } from "@/utils/string";
import { useAppContext } from "@/app/_context";
import { UserModel } from "@/models/user.model";

export default function WalletPage() {
  const [point, setPoint] = useState({
    email: "",
    point: "",
    message: "",
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    };
    if (window != undefined) {
      fetchUser();
    }
  }, []);
  const update = async () => {
    await getUser()
      .then((d) => {
        if (d != null) {
          localStorage.setItem("user", JSON.stringify(d));
          setUser(d);
        }
      })
      .catch(() => {
        setUser(null);
      });
    setPoint({
      email: "",
      point: "",
      message: "",
    });
  };
  const sendPoint = async () => {
    if (point.email != "" && point.point != "") {
      setLoading(true);
      const res = await sendPointByUser(
        point.email,
        parseInt(point.point),
        PointTitle.default,
        point.message
      );

      if (res) {
        toast({
          title: "Амжилттай шилжүүллээ.",
          status: "success",
          duration: 1000,
        });
        setLoading(false);
        update();
      } else {
        toast({
          title: ErrorMessages.tryAgain,
          status: "warning",
          duration: 1000,
        });
      }
    }
  };

  return (
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
            value={point.email}
            required
          />

          <input
            type="number"
            placeholder="Дүн"
            className={mergeNames(STYLES.input, "w-full rounded-md")}
            onChange={(e) => {
              setPoint((prev) => ({ ...prev, point: e.target.value }));
            }}
            value={point.point}
            required
          />

          <textarea
            placeholder="Мэссэж"
            maxLength={30}
            value={point.message}
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
            btnDialog={
              loading ? (
                <div
                  className={mergeNames(
                    STYLES.blueButton,
                    "text-center w-full p-2"
                  )}
                >
                  <Spinner />
                </div>
              ) : (
                <div
                  className={mergeNames(
                    STYLES.blueButton,
                    "text-center w-full p-2"
                  )}
                >
                  Шилжүүлэх
                </div>
              )
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
            onClick={() => {
              sendPoint();
            }}
          />
        </form>
        {/* <WalletForm onClick={() => sendPoint()} /> */}
      </div>
      <div className="h-[2px] bg-bgGrey" />

      {(user?.pointHistory?.length ?? 0) > 0 && <WHistory />}
    </div>
  );
}
