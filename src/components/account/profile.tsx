import {
  AgentAdditionModel,
  OrganizationAdditionModel,
  UserModel,
} from "@/models/user.model";
import mergeNames from "@/utils/functions";
import { Image, useToast } from "@chakra-ui/react";

import moment from "moment";

import { Fragment, ReactNode, useEffect, useState } from "react";
import ProfileInput from "./details/profileInput";
import { ProfileEnumType, SocialsEnum } from "@/config/enum";
import ChangeAgent from "./details/changeAgent";
import { SocialType } from "@/utils/type";
import Socials from "./details/socials";
import ProfileImage from "./details/profileImage";

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

const Profile = ({ user }: { user: UserModel }) => {
  //   const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState<UserModel>(user);
  const [orgData, setOrgData] = useState<OrganizationAdditionModel>(
    user?.organizationAddition
  );
  const [agentData, setAgentData] = useState<AgentAdditionModel>(
    user?.agentAddition
  );
  const toast = useToast();
  const [images, setImages] = useState<File[]>([]);
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
    //     setIsLoading(true);
    //     if (edit) {
    //       const token = getCookie("token");
    //       toast({
    //         title: "Та түр хүлээнэ үү",
    //       });
    //       let image = new FormData();
    //       image.append("images", selectedImage);
    //       let profileImg = user.profileImg ?? "";
    //       await axios
    //         .post(`${urls["test"]}/ad/uploadFields`, image, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Access-Control-Allow-Headers": "*",
    //           },
    //         })
    //         .then((d) => {
    //           profileImg = d.data[0];
    //         });
    //       let agentFiles = [];
    //       let orgFiles = [];
    //       let userType = user.userType;
    //       if (orgData.orgCertification != "") {
    //         userType = "organization";
    //         let oFile = new FormData();
    //         orgData.orgCertification?.map((prev) => {
    //           oFile.append("images", prev);
    //         });
    //         await axios
    //           .post(`${urls["test"]}/ad/uploadFields`, oFile, {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //               "Access-Control-Allow-Headers": "*",
    //             },
    //           })
    //           .then((d) => {
    //             orgFiles = d.data;
    //           });
    //       }
    //       if (agentData.orgCertification != "") {
    //         userType = "agent";
    //         let oFile = new FormData();
    //         agentData.orgCertification?.map((prev) => {
    //           oFile.append("images", prev);
    //         });
    //         agentPersonalCard?.map((prev) => {
    //           oFile.append("images", prev);
    //         });
    //         await axios
    //           .post(`${urls["test"]}/ad/uploadFields`, oFile, {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //               "Access-Control-Allow-Headers": "*",
    //             },
    //           })
    //           .then((d) => {
    //             agentFiles = d.data;
    //           });
    //       }
    //       try {
    //         await axios
    //           .put(
    //             `${urls["test"]}/user`,
    //             {
    //               profileImg: profileImg,
    //               socials: [
    //                 {
    //                   url: socials[0].url,
    //                   name: socials[0].name,
    //                 },
    //                 {
    //                   url: socials[1].url,
    //                   name: socials[1].name,
    //                 },
    //                 {
    //                   url: socials[2].url,
    //                   name: socials[2].name,
    //                 },
    //               ],
    //               phone: userData.phone,
    //               birthday: userData.birthday,
    //               username: userData.username,
    //               userType: userType,
    //               status: "pending",
    //               agentAddition: {
    //                 organizationName: agentData.orgName,
    //                 organizationContract: agentFiles[0],
    //                 identityCardFront: agentFiles[1],
    //                 identityCardBack: agentFiles[2],
    //                 firstName: agentData.firstName,
    //                 lastName: agentData.lastName,
    //                 registerNumber: agentData.register,
    //                 location: {
    //                   lng: agentData.orgLocation,
    //                   lat: agentData.orgLocation,
    //                 },
    //               },
    //               organizationAddition: {
    //                 organizationName: orgData.orgName,
    //                 organizationCertificationCopy: orgFiles[0],
    //                 location: {
    //                   lng: orgData.orgLocation,
    //                   lat: orgData.orgLocation,
    //                 },
    //                 organizationRegisterNumber: orgData.orgRegister,
    //               },
    //             },
    //             {
    //               headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Access-Control-Allow-Headers": "*",
    //                 charset: "UTF-8",
    //               },
    //             }
    //           )
    //           .then((d) => router.reload());
    //       } catch (error) {
    //         console.log(error);
    //         setIsLoading(false);
    //         setEdit(!edit);
    //       }
    //     }
    //     setEdit(!edit);
    //     setIsLoading(false);
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
                {/* <ChangeAgent
                  setAgent={setAgentData}
                  setOrg={setOrgData}
                  org={userData?.userType == "default"}
                  setImage={setImages}
                  image={images}
                  agent={false}
                />
                <ChangeAgent
                  setAgent={setAgentData}
                  setOrg={setOrgData}
                  org={false}
                  setImage={setImages}
                  image={images}
                  agent={userData?.userType == "default"}
                /> */}
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
            />
          ) : (
            <div className="border-2 border-blue-200 rounded-md border-500">
              <Image
                className="object-cover object-center  h-[25vh] overflow-hidden bg-gray-300 aspect-square "
                alt="Current Profile"
                src={
                  user?.profileImg ??
                  "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
                }
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
    </div>
  );
};

export default Profile;
