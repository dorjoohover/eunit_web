import { FaHeart } from "react-icons/fa";

import { Tooltip, useToast } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { BiGitCompare } from "react-icons/bi";

import { UserModel } from "@/models/user.model";
import mergeNames, { stopPropagation } from "@/utils/functions";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/_context";
import { bookmark, getUser } from "@/app/(api)/user.api";
import { AdCateIdType } from "@/utils/type";

const AdCardButton = ({
  id,
  adId,
  cateId,
}: {
  cateId: string;
  adId: string;
  id: number;
}) => {
  const [loading, setLoading] = useState(false);
  const {
    compare,
    setCompare,
  }: {
    compare: AdCateIdType[];
    setCompare: React.Dispatch<React.SetStateAction<AdCateIdType[]>>;
  } = useAppContext();
  const toast = useToast();
  const [mark, setMark] = useState<number[]>([]);
  const [user, setUser] = useState<UserModel | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      let value = localStorage.getItem("user");
      if (value) {
        let user = JSON.parse(value);
        setUser(user);
        setMark(user.bookmarks);
      }
    };
    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, []);
  const updateMark = async () => {
    if (!user) {
      toast({
        title: "Та нэвтэрнэ үү",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!loading) {
      try {
        setLoading(true);
        const body = mark.filter((m) => m != id);
        const was = body.length != mark.length;
        setMark((prev) => (!was ? [...prev, id] : body));

        was
          ? toast({
              title: "Зар хүслээс хасагдлаа.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            })
          : toast({
              title: "Зар хүсэлд нэмэгдлээ.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
        await bookmark(id);

        setLoading(false);
        const data = await getUser();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const getCompare = async () => {};

  const updateCompare = async () => {
    if (compare.length <= 4) {
      if (compare.length == 0) {
        setCompare([
          {
            id: adId,
            cateId: cateId,
          },
        ]);
      }
      compare.map((c) => {
        if (c.cateId == cateId && c.id != adId) {
          setCompare((prev) => [
            ...prev,
            {
              id: adId,
              cateId: cateId,
            },
          ]);
        } else {
          toast({
            title: "Өөр төрлийн зар эсвэл сонгогдсон зар байна.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    } else {
      toast({
        title: "Дүүрсэн байна.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const cardIcon = {
    div: "flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-slate-200/40 group-a hover:bg-slate-200  shadow-md",
    icon: "md:p-2 p-[5px] h-7 w-7 md:w-8 md:h-8",
  };

  return (
    <div className="relative flex flex-row items-center space-x-2">
      <Tooltip label="Хадгалах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={(e) => {
            stopPropagation(e);
            updateMark();
          }}
        >
          <FaHeart
            className={mergeNames(
              "hover:text-red-400 ",
              cardIcon.icon,

              mark?.find((b) => b == id) != undefined
                ? "text-red-500/90"
                : "text-slate-200/90"
            )}
          />
        </button>
      </Tooltip>

      <Tooltip label="Харьцуулах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={(e) => {
            stopPropagation(e);
            updateCompare();
          }}
        >
          <BiGitCompare
            className={mergeNames("text-blue-700", cardIcon.icon)}
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default AdCardButton;
