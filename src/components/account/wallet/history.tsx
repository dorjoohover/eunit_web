import { PointHistory, UserModel } from "@/models/user.model";
import mergeNames from "@/utils/functions";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const txthover = "font-semibold text-gray-500 duration-100 hover:text-gray-800";
const colSpan = "flex justify-between w-full  gap-3 font-bold text-center";

const WHistory = () => {
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      let value = localStorage.getItem("user");
      if (value) {
        let user: UserModel = JSON.parse(value);
        setPointHistory(user.pointHistory);
      }
    };
    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, []);
  return (
    <div className="w-full max-w-[800px] text-sm xl:text-base px-2 py-2 md:px-6 md:py-4 shadow-md border-2 border-slate-200/30 rounded-xl mx-auto">
      <Heading variant="mediumHeading">Гүйлгээний түүх</Heading>
      {/* <div className="flex flex-col w-full gap-3 mt-4">
        <div className="flex items-center gap-4">
          <p className="font-semibold">№</p>
          <div className={mergeNames(colSpan, " text-gray-500")}>
             <p className="text-left ">Илгээгч</p>
            <div className="flex flex-col justify-start text-left">
              <p className="">Мэссэж</p>
              <p className="text-sm">Хүлээн авагч</p>
            </div>
            <p className="text-right text-blue-700">E-unit</p>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col w-full mt-4">
        {pointHistory?.map((ph, i) => {
          return (
            <div className="flex flex-col w-full my-1" key={i}>
              <div className="w-full h-[2px] bg-bgGrey mb-2" />
              <div className="flex items-center gap-4">
                <p className="font-semibold">{i + 1}</p>
                <div className="w-1 h-8 bg-bgGrey " />
                <div className={mergeNames(colSpan, " text-gray-500")}>
                  {/* <p className="text-left ">Илгээгч</p> */}
                  <div className="flex flex-col justify-start text-left">
                    <p className="truncate ">{ph.message}</p>
                    {ph.type == "sender" ? (
                      <div className="flex gap-2 text-sm font-normal">
                        <p>to</p>
                        <a
                          href={"/account/" + (ph.receiver as UserModel)?._id}
                          target="_blank"
                          className={mergeNames(txthover, "text-center")}
                        >
                          {(ph.receiver as UserModel)?.username}
                        </a>
                      </div>
                    ) : (
                      <div className="flex gap-2 text-sm font-normal">
                        <p>from</p>
                        <a
                          href={"/account/" + (ph.sender as UserModel)?._id}
                          target="_blank"
                          className={mergeNames(txthover)}
                        >
                          {(ph.sender as UserModel)?.username}
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="text-right text-blue-700">
                    {ph.type == "sender" ? "-" : "+"}
                    {ph.point}
                  </p>
                </div>
              </div>
            </div>

            // <div
            //   className="flex items-center gap-4 border-t-2 border-gray-200"
            //   key={i}
            // >
            //   <p className="font-semibold">{i + 1}</p>
            //   <div
            //     className={mergeNames(
            //       colSpan,
            //       "py-2 font-normal text-gray-500"
            //     )}
            //   >
            //     {/* <a
            //       href={"/account/" + ph.sender?.id}
            //       target="_blank"
            //       className={mergeNames(txthover)}
            //     >
            //       {ph.sender?.username}
            //     </a> */}
            //     <a
            //       href={"/account/" + ph.receiver?.id}
            //       target="_blank"
            //       className={mergeNames(txthover, "text-center")}
            //     >
            //       {ph.receiver?.username}
            //     </a>
            //     <p className="col-span-2 font-semibold truncate">
            //       {ph.message}
            //     </p>
            //     <p className="font-bold text-right text-blue-700 ">
            //       {ph.type == "sender" ? "-" : "+"}
            //       {ph.point}
            //     </p>
            //   </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default WHistory;
