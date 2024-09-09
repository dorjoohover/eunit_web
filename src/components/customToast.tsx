import mergeNames from "@/utils/functions";
import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";

const CustomToast = ({
  toastBtn,
  onClick,
  toastH,
  toastP = "",

  className,
  status = "info",
}: {
  status: string;
  className: string;
  toastH: string;
  toastP?: string;
  onClick: () => void;
  toastBtn: ReactNode;
}) => {

  return (
    <button
      className={mergeNames("flex items-center gap-1", className)}
      // onClick={() => {
      //   toast({
      //     position: 'bottom-center',
      //     render: () => (
      //       <div
      //         className={mergeNames(
      //           'w-3/4  mx-auto p-2 text-white bg-green-500 shadow-xl rounded-md ',
      //           STYLES.flexCenter,
      //           'items-center gap-3',
      //           'border-b-4 border-green-300'
      //         )}
      //       >
      //         <TiTick className="h-full p-1 text-4xl text-green-500 bg-white rounded-full" />

      //         <div className="flex flex-col text-[16px] ">
      //           <p className="font-bold">{toastH} </p>
      //           <p className=" fon-semibold">{toastP}</p>
      //         </div>
      //       </div>
      //     ),
      //     duration: 2000,
      //     isClosable: true,
      //   });
      // }}
      onClick={() => {
        notifications.show({
          message: `${toastH}`,
          description: `${toastP ?? ''}`,
          status:
            status == "info"
              ? "info"
              : status == "error"
              ? "error"
              : status == "warning"
              ? "warning"
              : status == "success"
              ? "success"
              : "loading",
          duration: 2000,
          isClosable: true,
        }),
          onClick();
      }}
    >
      {toastBtn}
    </button>
  );
};

export default CustomToast;
