import WhiteBox from "@/components/createAd/product/whiteBox";
import { AtomLabel } from "@/components/createAd/step3/atom";
import FieldPhotoUpload from "@/components/createAd/step3/fieldPhotoUpload";
import { LoadingButton } from "@/components/global/button";
import CustomModal from "@/components/global/customModal";
import Input from "@/components/global/input";
import {
  AgentAdditionModel,
  OrganizationAdditionModel,
} from "@/models/user.model";
import { STYLES } from "@/styles/index";
import mergeNames from "@/utils/functions";

import { useDisclosure } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { BiEdit } from "react-icons/bi";

const FlexDiv = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {title}
      {children}
    </div>
  );
};

const ChangeAgent = ({
  agent,
  org,
  setOrg,
  setAgent,
  setImage,
  image,
}: {
  image: File[];
  agent: boolean;
  setAgent: React.Dispatch<React.SetStateAction<AgentAdditionModel>>;
  org: boolean;
  setOrg: React.Dispatch<React.SetStateAction<OrganizationAdditionModel>>;
  setImage: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return agent || org ? (
    <CustomModal
      onClose={onClose}
      onOpen={onOpen}
      isOpen={isOpen}
      onclick={onClose}
      btnOpen={
        <>
          {agent && <p>Агент</p>}
          {org && <p>Байгууллага</p>}
          <BiEdit />
        </>
      }
      btnClose={<LoadingButton isLoading={false} text="Болсон" />}
      btnClose2="Буцах"
      header="Хэрэглэгчийн төрөл"
    >
      {agent && (
        <>
          <WhiteBox heading="Бөглөх" className="grid grid-cols-2 gap-5 ">
            <>
              <FlexDiv title="Байгууллагын нэр">
                <input
                  className={mergeNames(STYLES.input)}
                  placeholder="Байгууллагын нэр"
                  onChange={(e) =>
                    setAgent((prev) => ({
                      ...prev,
                      organizationName: e.target.value,
                    }))
                  }
                />
              </FlexDiv>

              <FlexDiv title="Овог">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="Нэр">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="Регистрийн дугаар">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({
                      ...prev,
                      registerNumber: e.target.value,
                    }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="Компанийн байршил хаяг">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, address: e.target.value }))
                  }
                />
              </FlexDiv>
            </>
          </WhiteBox>
          <WhiteBox heading="Зураг оруулах" className="grid grid-cols-2 gap-5 ">
            <>
              <FlexDiv title="">
                <AtomLabel>Байгууллагатай байгуулсан гэрээ</AtomLabel>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={(e) =>
                    setAgent((prev) => ({
                      ...prev,
                      orgCertification: e.target.files,
                    }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="">
                <FieldPhotoUpload
                  data={agent}
                  images={image}
                  label="Иргэний үнэмлэх зураг"
                  setData={setAgent}
                  setImages={setImage}
                />
              </FlexDiv>
            </>
          </WhiteBox>
        </>
      )}
      {org && (
        <>
          <WhiteBox heading="Бөглөх" className="grid grid-cols-2 gap-5 ">
            <>
              <FlexDiv title="Байгууллагын нэр">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setOrg((prev) => ({ ...prev, orgName: e.target.value }))
                  }
                  placeholder="Байгууллагын нэр"
                />
              </FlexDiv>

              <FlexDiv title="Байгууллагын регистрийн дугаар">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setOrg((prev) => ({ ...prev, orgRegister: e.target.value }))
                  }
                  placeholder="Байгууллагын регистрийн дугаар"
                />
              </FlexDiv>
            </>
          </WhiteBox>
          <WhiteBox heading="Зураг оруулах" className="grid grid-cols-2 gap-5 ">
            <FlexDiv title="">
              <AtomLabel>Копманы гэрчилгээ хуулбар</AtomLabel>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={(e) =>
                  setOrg((prev) => ({
                    ...prev,
                    orgCertification: e.target.files,
                  }))
                }
              />
            </FlexDiv>
          </WhiteBox>
          <WhiteBox heading="Компаны хаяг">
            <input
              className={mergeNames(STYLES.input, "min-w-[500px]")}
              type="text"
              placeholder="Нэр"
              onChange={(e) =>
                setOrg((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </WhiteBox>
        </>
      )}
    </CustomModal>
  ) : (
    <></>
  );
};

export default ChangeAgent;
