import { STYLES } from "@/styles/index";
import mergeNames, { getEstimateEnums } from "@/utils/functions";

import {
  Button,
  Image,
  Input,
  Link,
  NumberInput,
  NumberInputField,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import currency from "currency.js";

import { ReactNode, useState } from "react";

import { AiFillEye } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { CgZoomIn } from "react-icons/cg";

import { MdRestartAlt } from "react-icons/md";
import Alerting from "./global/alert";
import CustomModal from "./global/customModal";
import { useRouter } from "next/navigation";
import { EstimateModel } from "@/models/estimate.model";
import { CategoryModel } from "@/models/category.model";
import { EstimateStatus } from "@/config/enum";
import { BomArea } from "./bomInput";
import { imageApi } from "@/utils/values";
import { updatePriceEstimateById } from "@/app/(api)/estimate.api";

const EstimatedCard = ({
  est,
  AdminBtn,
}: {
  est: EstimateModel;
  AdminBtn?: ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const deleteEstimate = async (id: string) => {
    try {
      //   await axios
      //     .delete(`${urls["test"]}/estimate/${id}`, {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     })
      //     .then((d) => {
      //       if (d.data.acknowledged) {
      //         router.reload();
      //       }
      //     });
    } catch (error) {
      console.error(error);
    }
  };
  const toast = useToast();
  const updatePrice = async (id: string) => {
    try {
      if (price)
        await updatePriceEstimateById(price, id).then((d) => {
          onClose(),
            toast({
              title: "Амжилттай үнийн дүн нэмлээ.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          router.refresh();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const updateMessageEstimate = async (
    id: string,
    status: string,
    body: string
  ) => {
    // let token = getCookie('token');
    // let router = useRouter();
    // let toast = useToast();
    // try {
    //   await axios
    //     .put(`${urls['test']}/estimate/message/${id}/${status}`, body, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((d) => {
    //       if (d.data.acknowledged) {
    //         router.reload();
    //         toast({
    //           title: 'Амжилттай .',
    //           status: 'success',
    //           duration: 2000,
    //           isClosable: true,
    //         });
    //       }
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const [price, setPrice] = useState<number>();
  const [note, setNote] = useState("");
  return (
    <div className="w-full text-left">
      <div className="bg-white shadow-md flex gap-5 rounded-md p-5 border border-gray-200  h-[125px]">
        <Link
          href={imageApi + est.file ?? ""}
          target="_blank"
          className="relative flex items-center"
        >
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
            }
            alt="Үнэлгээ зураг"
            className="w-[60px] overflow-hidden border border-gray-300 rounded-md "
          />
          <CgZoomIn className="absolute text-2xl text-slate-700 bg-blue-100 rounded-full p-[2px] -bottom-2 -right-2 position" />
        </Link>
        <div className="flex flex-col justify-between w-full h-full ">
          <div className="flex justify-between w-full">
            <div className="text-sm font-semibold">
              <h1 className="text-gray-400">
                {(est?.category as CategoryModel)?.name ?? ""}
              </h1>
              {/* <h1>{est?.subCategory?.name ?? ""}</h1> */}
            </div>

            <div>
              {est.price && (
                <p className="font-semibold text-md sm:text-xl text-mainBlue">
                  {currency(`${est.price}`, {
                    separator: ",",
                    symbol: "₮ ",
                    pattern: `# !`,
                  })
                    .format()
                    .toString() ?? 0}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="text-sm">
              <h1
                className={mergeNames(
                  "text-gray-400 font-semibold",
                  est.status == EstimateStatus.pending ? "text-yellow-400" : "",
                  est.status == EstimateStatus.deleted ? "text-red-400" : ""
                )}
              >
                {getEstimateEnums(est.status ?? "")}
              </h1>
              {/* <h1>Lorem ipsum dolor sit amet.</h1> */}
            </div>
            <div className="flex items-center gap-3">
              <Alerting
                title="Үнэлгээ"
                isDelete={"Устгах"}
                // className={mergeNames(cardIcon.div, "px-2 rounded-md")}
                bg="bg-transparent"
                btn={
                  // <BiTrash
                  //   className={mergeNames("text-red-500", cardIcon.icon)}
                  //   isDelete={false}
                  // />
                  <EstimateButton
                    label={false}
                    onClick={() => {}}
                    icon="delete"
                  />
                  //   <EstimateButton icon="delete" isDelete={false} />
                }
                onClick={() => {
                  deleteEstimate(est._id ?? "");
                }}
              />
              <Alerting
                title="Үнэлгээ"
                isDelete={"Буцаах"}
                className={mergeNames(cardIcon.div, "px-2 rounded-md")}
                bg="bg-transparent"
                body={
                  <>
                    <BomArea
                      placeholder="Нэмэлт тайлбар"
                      onChange={(e) => setNote(e)}
                    />
                  </>
                }
                btn={
                  // <BiTrash
                  //   className={mergeNames("text-yellow-500", cardIcon.icon)}
                  //   isDelete={false}
                  // />
                  //   <EstimateButton icon="return" isDelete={false} />
                  <EstimateButton icon="return" />
                }
                onClick={() => {
                  updateMessageEstimate(est._id ?? "", "returned", "");
                  // updateMessageEstimate(est._id ?? "", "returned", {
                  //   message: '',
                  // });
                }}
              />
              {/* <EstimateButton /> */}
              <CustomModal
                onclick={() => {}}
                className=""
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                btnClose2={"Буцах"}
                header={"Үнэлгээ"}
                btnOpen={<EstimateButton icon="show" />}
              >
                <div className="flex flex-col gap-3">
                  {est?.items?.map((item, i) => {
                    return (
                      <h2 key={i}>
                        {item.name}:
                        <span className="font-semibold">
                          &nbsp;{item.value}{" "}
                        </span>
                      </h2>
                    );
                  })}
                  {est?.returnMessage && (
                    <h2>
                      Утга:
                      <span className="font-semibold">
                        &nbsp;{est?.returnMessage ?? ""}{" "}
                      </span>
                    </h2>
                  )}
                  {est.price && (
                    <h2>
                      Үнэ:
                      <span className="font-semibold">
                        &nbsp;{" "}
                        {currency(`${est.price}`, {
                          separator: ",",
                          symbol: "₮ ",
                          pattern: `# !`,
                        })
                          .format()
                          .toString() ?? 0}{" "}
                      </span>
                    </h2>
                  )}

                  <p className={mergeNames("text-center")}></p>
                  {est.price == undefined && (
                    <div className="flex flex-col gap-3 text-lg">
                      <NumberInput
                        onChange={(e) => {
                          setPrice(parseInt(e));
                        }}
                      >
                        <NumberInputField
                          type="number"
                          placeholder="Үнэлсэн дүн"
                          value={price ?? ""}
                        />
                      </NumberInput>
                      {/* <BomArea placeholder="Нэмэлт тайлбар" /> */}
                      {price && (
                        <Button
                          className={mergeNames(STYLES.blueButton)}
                          onClick={() => {
                            updatePrice(est?._id ?? "");
                          }}
                        >
                          Үнэлгээ илгээх
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CustomModal>
              {AdminBtn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedCard;

export const EstimateButton = ({
  label = false,
  icon = "delete",
  onClick = () => {},
}: {
  label?: boolean;
  icon?: string;
  onClick?: () => void;
}) => {
  return (
    <div className="relative flex flex-row items-center space-x-2">
      <div
        className={mergeNames(
          cardIcon.div,
          label
            ? "px-2 rounded-md bg-red-200/40 cursor-pointer"
            : "cursor-pointer"
        )}
        onClick={() => {
          if (onClick != null) {
            onClick();
          }
        }}
      >
        {icon == "delete" && (
          <BiTrash className={mergeNames("text-red-500", cardIcon.icon)} />
        )}
        {icon == "return" && (
          <MdRestartAlt
            className={mergeNames("text-yellow-500", cardIcon.icon)}
          />
        )}
        {icon == "show" && (
          <AiFillEye className={mergeNames("text-blue-500", cardIcon.icon)} />
        )}

        {label && <p className="text-sm text-red-400 ">Үнэлгээг хоослох</p>}
      </div>
    </div>
  );
};

// export const EstimateShowButton = ({ label = false }) => {
//   return (
//     <div className="relative flex flex-row items-center space-x-2">
//       <button
//         className={mergeNames(
//           cardIcon.div,
//           label && "px-2 rounded-md bg-red-200/40"
//         )}
//         onClick={() => {}}
//       >
//         <AiFillEye className={mergeNames("text-blue-500", cardIcon.icon)} />
//         {label && <p className="text-sm text-blue-400 "> Үнэлгээг хоослох</p>}
//       </button>
//     </div>
//   );
// };
const cardIcon = {
  div: "flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-blue-200/40 group-a hover:bg-slate-200  shadow-md",
  icon: "md:p-2 p-[5px] h-7 w-7 md:w-8 md:h-8",
};
