import { SocialsEnum } from "@/config/enum";
import { STYLES } from "@/styles/index";
import mergeNames from "@/utils/functions";
import { SocialType } from "@/utils/type";

import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { Fragment } from "react";

const capitalizeFirst = (str: string): string =>
  str.toString().slice(0, 1).toUpperCase() +
  str.toString().slice(1).toLowerCase();

const Socials = ({
  edit,
  socials,
  setSocials,
}: {
  edit: boolean;
  socials: SocialType[];
  setSocials: React.Dispatch<React.SetStateAction<SocialType[]>>;
}) => {
  const [urls, setUrls] = useState(socials);

  return (
    <>
      <div className="col-span-full">
        <h2 className="text-[20px] font-bold">Сошиал хаягууд</h2>
        <div
          className={mergeNames(
            edit ? "flex flex-col gap-3" : STYLES.flexBetween,
            "mt-4",
            edit == true ? "animate-pin" : ""
          )}
        >
          {socials?.map((s, i) => {
            return (
              <div
                key={i}
                className={mergeNames(s.url == "" && !edit ? "hidden" : "")}
              >
                <Link
                  className={mergeNames(
                    s.url == "" ? "pointer-events-none" : ""
                  )}
                  href={s.url != undefined ? s.url : ""}
                  passHref
                  target="_blank"
                >
                  <Flex alignItems="center" gap={2}>
                    {/* <BsFacebook className="text-blue-600" /> */}
                    <p className="md:text-[16px] text-[12px] font-bold">
                      {capitalizeFirst(s.name ?? "")}
                    </p>
                    <Image
                      src={
                        `/assets/utils/socials/` +
                        capitalizeFirst(s.name) +
                        `.svg`
                      }
                      alt="social icon"
                      className="w-[30px]"
                    />
                  </Flex>
                </Link>
                {edit && (
                  <input
                    type="text"
                    onChange={(e) => {
                      switch (i) {
                        case 0:
                          setSocials([
                            {
                              name: SocialsEnum.facebook,
                              url: e.target.value,
                            },
                            {
                              name: SocialsEnum.instagram,
                              url: socials?.[1]?.url,
                            },
                            {
                              name: SocialsEnum.telegram,
                              url: socials?.[2]?.url,
                            },
                          ]);
                          break;
                        case 1:
                          setSocials([
                            {
                              name: SocialsEnum.facebook,
                              url: socials?.[0]?.url,
                            },
                            {
                              name: SocialsEnum.instagram,
                              url: e.target.value,
                            },
                            {
                              name: SocialsEnum.telegram,
                              url: socials?.[2]?.url,
                            },
                          ]);
                          break;
                        case 0:
                          setSocials([
                            {
                              name: SocialsEnum.facebook,
                              url: socials?.[0]?.url,
                            },
                            {
                              name: SocialsEnum.instagram,
                              url: socials?.[1]?.url,
                            },
                            {
                              name: SocialsEnum.telegram,
                              url: e.target.value,
                            },
                          ]);
                          break;
                      }
                    }}
                    key={i}
                    className={mergeNames(STYLES.input, "w-full ")}
                    placeholder={s.url}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Socials;
