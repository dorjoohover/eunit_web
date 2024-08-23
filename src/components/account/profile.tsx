import {
  AgentAdditionModel,
  OrganizationAdditionModel,
  UserModel,
} from "@/models/user.model";
import mergeNames, { imageExists, profileImgUrl } from "@/utils/functions";
import { Image, Spinner, useToast } from "@chakra-ui/react";

import moment from "moment";

import { Fragment, ReactNode, useEffect, useState } from "react";
import ProfileInput from "./details/profileInput";
import {
  ProfileEnumType,
  SocialsEnum,
  UserStatus,
  UserType,
} from "@/config/enum";
import ChangeAgent from "./details/changeAgent";
import { SocialType } from "@/utils/type";
import Socials from "./details/socials";
import ProfileImage from "./details/profileImage";
import { getUser, updateProfile } from "@/app/(api)/user.api";
import { ErrorMessages } from "@/utils/string";

const GroupLayout = ({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={mergeNames("flex flex-col justify-start gap-3", className ?? "")}
  >
    <h2 className="text-[20px] font-bold">{title}</h2>
    <div className="relative flex gap-1">{children}</div>
  </div>
);

const initialUser = {
  username: "",
  ads: [],
  phone: "",
  userType: UserType.default,
  socials: [],
  email: "",
  point: 0,
  bookmarks: [],
  agentAddition: {
    organizationName: "",
  },
  organizationAddition: {
    organizationName: "",
  },
  message: "",
  pointHistory: [],
  status: UserStatus.pending,
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState<UserModel | null>(null);
  const [userData, setUserData] = useState<UserModel>(user ?? initialUser);
  useEffect(() => {
    const fetchUser = async () => {
      let value = localStorage.getItem("user");
      if (value) {
        setUser(JSON.parse(value));
        setUserData(JSON.parse(value));
      } else {
        const data = await getUser();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setUserData(data ?? initialUser);
      }
    };
    setSocials([
      {
        name: SocialsEnum.facebook,
        url: user?.socials?.[0]?.url ?? "",
      },
      {
        name: SocialsEnum.instagram,
        url: user?.socials?.[1]?.url ?? "",
      },
      {
        name: SocialsEnum.telegram,
        url: user?.socials?.[2]?.url ?? "",
      },
    ]);
    imageExists(user?.profileImg ?? "");
    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, []);
  const [agentData, setAgentData] = useState<AgentAdditionModel>(
    user?.agentAddition ?? {
      organizationName: "",
    }
  );
  const [orgData, setOrgData] = useState<OrganizationAdditionModel>(
    user?.organizationAddition ?? {
      organizationName: "",
    }
  );
  const toast = useToast();
  const [images, setImages] = useState<File>();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState(user?.profileImg);
  // const router = useRouter();
  const initialSocials = [
    {
      name: SocialsEnum.facebook,
      url: user?.socials?.[0]?.url ?? "",
    },
    {
      name: SocialsEnum.instagram,
      url: user?.socials?.[1]?.url ?? "",
    },
    {
      name: SocialsEnum.telegram,
      url: user?.socials?.[2]?.url ?? "",
    },
  ];
  const [socials, setSocials] = useState<SocialType[]>(initialSocials);

  const handleEdit = async () => {
    setEdit(!edit);
    if (edit) {
      setIsLoading(true);

      let image = new FormData();
      let isImage = images != undefined;
      let isFile =
        agentData.orgCertificationFile != undefined ||
        orgData.orgCertificationFile != undefined;
      let userType = user?.userType;
      if (isImage) image.append("files", images!);
      let isOrg = orgData.organizationName != "" && orgData != undefined;
      let isAgent = agentData.organizationName != "" && agentData != undefined;
      let file = new FormData();
      if (isAgent) {
        agentData.orgCertificationFile?.map((f) => file.append("files", f));
        files?.map((d) => file.append("files", d));
      }
      if (isOrg)
        orgData.orgCertificationFile?.map((d) => file.append("files", d));
      let agent = isAgent
        ? {
            organizationName: agentData.organizationName,
            firstName: agentData.firstName,
            lastName: agentData.lastName,
            registerNumber: agentData.registerNumber,
            location: {
              lng: agentData.location?.lng,
              lat: agentData.location?.lat,
            },
            address: agentData.address,
          }
        : null;
      let org = isOrg
        ? {
            organizationName: orgData.organizationName,
            location: {
              lng: orgData.location?.lng,
              lat: orgData.location?.lat,
            },
            address: orgData.address,
            organizationRegisterNumber: orgData.organizationRegisterNumber,
          }
        : null;

      let body = {
        socials: [
          {
            url: socials[0].url,
            name: socials[0].name,
          },
          {
            url: socials[1].url,
            name: socials[1].name,
          },
          {
            url: socials[2].url,
            name: socials[2].name,
          },
        ],
        phone: userData?.phone,
        birthday: userData?.birthday,
        username: userData?.username,
        userType: userType,
      };
      const res = await updateProfile(
        image,
        file,
        isImage,
        isFile,
        body,
        agent,
        org,
        user?.profileImg ?? "",
        isAgent,
        isOrg
      );

      res
        ? toast({
            title: "Амжилттай.",
            status: "success",
          })
        : toast({
            title: ErrorMessages.tryAgain,
            status: "warning",
          });

      setIsLoading(false);
      setEdit(false);
    }
  };

  return (
    <div className="flex-col h-full">
      <div
        className={mergeNames(
          "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2",
          "gap-y-6 gap-x-10",
          "py-5"
        )}
      >
        <GroupLayout title="Овог Нэр">
          <ProfileInput
            edit={edit}
            ph={userData?.username ?? ""}
            onChange={(e) => setUserData((prev) => ({ ...prev, username: e }))}
            item={ProfileEnumType.username}
          />
        </GroupLayout>

        <GroupLayout title="Утас">
          <ProfileInput
            type="tel"
            ph={userData?.phone}
            item={ProfileEnumType.phone}
            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e }))}
            edit={edit}
          />
        </GroupLayout>

        <GroupLayout title="Хэрэглэгчийн төрөл" className="">
          <p className="flex items-center gap-4 italic font-semibold uppercase">
            {userData?.userType == "default"
              ? "Энгийн"
              : userData?.userType == "agent"
              ? "Агент"
              : userData?.userType == "organization"
              ? "Байгууллага"
              : userData?.userType}
            {edit && user && (
              <Fragment>
                <ChangeAgent
                  setAgent={setAgentData}
                  setOrg={setOrgData}
                  org={userData?.userType == "default"}
                  setImage={setFiles}
                  image={files}
                  agent={false}
                />
                <ChangeAgent
                  setAgent={setAgentData}
                  setOrg={setOrgData}
                  org={false}
                  setImage={setFiles}
                  image={files}
                  agent={userData?.userType == "default"}
                />
              </Fragment>
            )}
          </p>
        </GroupLayout>

        <GroupLayout title="Төрсөн өдөр">
          <ProfileInput
            value={moment(
              userData?.birthday ?? Date.now(),
              "YYYY-MM-DD"
            ).format("YYYY-MM-DD")}
            type="date"
            item={ProfileEnumType.date}
            edit={edit}
            ph={"01-02-2002"}
            onChange={(e) => setUserData((prev) => ({ ...prev, birthday: e }))}
          />
        </GroupLayout>

        <Socials edit={edit} socials={socials} setSocials={setSocials} />

        <GroupLayout title="Профайл зураг" className="col-span-1/2">
          {edit ? (
            <ProfileImage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setImages={setImages}
              images={images}
            />
          ) : (
            <div className="border-2 border-blue-200 rounded-md border-500">
              <Image
                className="object-cover object-center  h-[25vh] overflow-hidden bg-gray-300 aspect-square "
                alt="Current Profile"
                src={profileImgUrl(user?.profileImg)}
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </GroupLayout>
        <div className="grid grid-cols-1">
          <GroupLayout title="Бүртгэлтэй Имэйл" className="col-span-full">
            <p className="italic">{user?.email}</p>
          </GroupLayout>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <button
          className={mergeNames(
            // 'hidden',
            "text-white  transition-all ease-linear",
            "float-right mt-5 px-5 py-2 font-bold w-32 rounded-[30px]",
            edit ? "bg-mainBlue hover:bg-blue-900" : "bg-red-500"
          )}
          onClick={handleEdit}
        >
          <p>{edit ? "Хадгалах" : "Засварлах"}</p>
        </button>
      )}
    </div>
  );
};

export default Profile;
