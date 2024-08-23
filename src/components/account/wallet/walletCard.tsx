import { Image } from "@chakra-ui/react";
import currency from "currency.js";
import TransactionGuide from "./transactionGuide";
import { UserModel } from "@/models/user.model";
import { useEffect, useState } from "react";

const WalletCard = () => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      let value = localStorage.getItem("user");
      if (value) {
        setUser(JSON.parse(value));
      }
    };
    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="font-bold w-full  h-[250px] bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg p-5 flex flex-col justify-between mx-auto text-white">
          <div className="flex justify-between">
            <h1 className="text-xl">E-unit хэтэвч</h1>
            <Image
              alt="bom logo"
              src="/assets/images/logo/bom-white.png"
              className="w-[30px]"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white/80">Нэр</h1>
            <h1 className="">{user?.username}</h1>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white/80">Үлдэгдэл</h1>
              <h1 className="text-xl">
                {currency(
                  `${user?.point ?? 0}`,

                  {
                    separator: ",",
                    symbol: " E-unit - ₮",
                    pattern: `# !`,
                  }
                )
                  .format()
                  .toString() ?? 0}
              </h1>
            </div>
            <TransactionGuide />
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletCard;
