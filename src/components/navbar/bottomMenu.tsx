// import { CloseIcon, SearchIcon } from "@/util/Icons";
import mergeNames from "@/utils/functions";

const Container = ({ text = "", Icon = () => <></>, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-1/5 py-4 text-center cursor-pointer group"
    >
      {/* <Icon
        size={20}
        className="text-white group-hover:text-amber-300 group-hover:scale-110"
      /> */}
      <p className="text-xs font-semibold text-white group-hover:text-amber-300">
        {text}
      </p>
    </button>
  );
};

const BottomMenu = () => {
  // const router = useRouter();

  // const handleLink = (link) => {
  //   router.push(link);
  // };

  // const [search, setSearch] = useState(false);
  return (
    <div className="relative">
      <div className="fixed bottom-0 left-0 right-0 z-50 w-screen md:hidden bg-mainBlossom">
        <div className="flex flex-row">
          {/* <Container
            onClick={() => handleLink("/")}
            text="Нүүр"
            Icon={(props) => <HiHome {...props} />}
          />
          <Container
            onClick={() => handleLink("/account?tab=WalletPage")}
            text="Хэтэвч"
            Icon={(props) => <IoWallet {...props} />}
          />
          <Container
            onClick={() => setSearch(true)}
            text="Хайлт"
            Icon={(props) => <BiSearch {...props} />}
          />
          <Container
            onClick={() => handleLink("/estimator")}
            text="Үнэлгээ"
            Icon={(props) => <AiFillCalculator {...props} />}
          />
          <Container
            text="Профайл"
            onClick={() => handleLink("/account")}
            Icon={(props) => <FaUserCircle {...props} />}
          /> */}
        </div>
        <div
          // className={mergeNames(
          //   "fixed  left-0 z-50 w-full h-full p-6 bg-bgGrey duration-300 flex  flex-col items-center justify-between",
          //   search ? "top-0" : "top-[100%]"
          // )}
        >
          <div className="flex items-center w-full overflow-hidden shadow-md rounded-xl">
            <input
              type="text"
              placeholder="Хайх"
              className="w-full px-4 py-3 text-sm"
            />
            <button
              // onClick={() => {
              //   handleLink("/search"), setSearch(false);
              // }}
              className="h-full p-3 bg-white"
            >
              {/* <SearchIcon className="text-xl" /> */}
            </button>
          </div>

          <button
            // onClick={() => setSearch(false)}
            className="p-4 bg-gray-300 rounded-full"
          >
            {/* <CloseIcon className="text-xl" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
