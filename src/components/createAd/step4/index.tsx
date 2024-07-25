import { Box } from "@chakra-ui/react";
import { Dispatch, FC, Fragment, ReactNode, SetStateAction } from "react";

import ButtonSelectItem from "../formButtonSelectItem";
import FormLabel from "../formLabel";

import { ItemDetailModel, ItemModel } from "@/models/items.model";
import { ItemTypes } from "@/config/enum";
import mergeNames from "@/utils/functions";
import FilterDate, {
  FilterButtonSelector,
  FilterCounter,
  FilterSelect,
  FilterText,
  FilterYear,
} from "../filters";
import Select from "@/components/global/select";
import Input from "@/components/global/input";
import { CacheVarType, ItemType, StepTypes } from "@/utils/type";
import { CommitteeData } from "@/utils/values";

const Step4 = ({
  filter,
  handle,
  state,
  cache,
  setCache,
}: {
  filter: ItemModel[];
  handle: Dispatch<SetStateAction<StepTypes | undefined>>;
  setCache: Dispatch<SetStateAction<CacheVarType[] | []>>;
  state?: StepTypes;
  cache: CacheVarType[];
}) => {
  return (
    <div className="grid w-full md:grid-cols-2 ">
      {filter?.map((f, i) => {
        let key: keyof StepTypes;
        key = f.type as keyof StepTypes;
        let cacheSelf = cache.filter((c) => c.parent == f.type)?.[0];
        let cacheParent = cache.filter((c) => c.parent == f.parentId)?.[0];
        let cachePosition = cache.filter((c) => c.parent == f.position)?.[0];

        if (
          f.other == true &&
          f.value?.find((v) => v.id == "other") == undefined
        )
          f.value?.push({ id: "other", value: "Бусад" });
        if (f.types == ItemTypes.date)
          return (
            <FilterDate
              key={i}
              requirement={
                state?.[key] != undefined && state?.[key] ? false : true
              }
              title={f.name}
              name={f.name}
              onSelect={(num) => handle((prev) => ({ ...prev, [key]: num }))}
            />
          );
        if (f.types == ItemTypes.year)
          return (
            <FilterYear
              key={i}
              title={f.name}
              value={(state?.[key] as string) ?? "0"}
              onSelect={(num) => handle((prev) => ({ ...prev, [key]: num }))}
            />
          );
        if (f.types === ItemTypes.number)
          return (
            <FilterCounter
              key={i}
              requirement={
                state?.[key] != "" && state?.[key] != undefined ? false : true
              }
              title={f.name}
              limit={parseInt(f.value?.[f.value?.length - 2]?.value ?? "0")}
              maxValue={parseInt(f.value?.[f.value?.length - 1]?.value ?? "0")}
              setValue={(num) => handle((prev) => ({ ...prev, [key]: num }))}
            />
          );
        if (f.types == ItemTypes.text)
          return (
            <FilterText
              key={i}
              title={f.name}
              ph={f.name}
              value={state?.[key] as string}
              onChange={(num) => handle((prev) => ({ ...prev, [key]: num }))}
            />
          );
        if (f.types === ItemTypes.radio)
          return (
            <FilterButtonSelector
              key={i}
              title={f.name}
              data={f.value}
              selected={state?.[key] as string}
              Item={(items: ItemType) => {
                let { data, id, onClick } = items;

                return (
                  <ButtonSelectItem
                    data={data!}
                    key={id}
                    {...items}
                    onClick={() => {
                      handle((prev) => ({ ...prev, [key]: items.data }));
                      if (onClick != null) {
                        onClick();
                      }
                    }}
                  >
                    <>
                      {data}
                      {items.children}
                    </>
                  </ButtonSelectItem>
                );
              }}
            />
          );

        if (f.type == ItemTypes.committee) {
          return (
            cacheParent?.parent == f.parentId && (
              <>
                <FilterSelect
                  key={i}
                  label={(state?.[key] as string) ?? f.name}
                  title={f.name}
                  data={
                    cacheParent.id != "country"
                      ? CommitteeData
                      : f.value?.filter((v) => v.parentId == cachePosition?.id)
                  }
                  requirement={
                    cacheParent.id != undefined && cacheParent.id != ""
                      ? false
                      : true
                  }
                  Item={(items: ItemType) => {
                    const { id, data, onClick, children } = items;
                    return (
                      <button
                        key={id}
                        {...items}
                        onClick={(e) => {
                          e.persist();
                          handle((prev) => ({ ...prev, [key]: data }));
                          if (cacheParent != undefined) {
                            cacheParent.value = data!;
                            cacheParent.id = id!;
                          } else {
                            cache.push({
                              id: id!,
                              value: data!,
                              parent: f.type,
                            });
                          }
                          
                          setCache((prev) => [...prev]);

                          if (onClick != null) {
                            onClick();
                          }
                        }}
                      >
                        {data}
                        {children}
                      </button>
                    );
                  }}
                />
              </>
            )
          );
        }
        if (f.types == ItemTypes.dropdown)
          if (f.parentId == null) {
            
            return (
              <FilterSelect
                key={i}
                requirement={
                  state?.[key] != undefined && state?.[key] != "" ? false : true
                }
                title={f.name}
                data={f.value}
                label={(state?.[key] as string) ?? f.name}
                Item={({ data, onClick, id, children, ...props }: ItemType) => {
                  return (
                    <button
                      key={id}
                      {...props}
                      onClick={(e) => {
                        e.persist();

                        handle((prev) => ({
                          ...prev,
                          [key]: data,
                        }));
                        if (cacheSelf != undefined) {
                          cacheSelf.value = data!;
                          cacheSelf.id = id!;
                        } else {
                          cache.push({
                            id: id!,
                            value: data!,
                            parent: f.type,
                            position: f.position,
                          });
                        }
                        setCache((prev) => [...prev]);

                        if (onClick != null) onClick();
                      }}
                    >
                      {data}
                      {children}
                    </button>
                  );
                }}
              />
            );
          } else {
            return (
              cacheParent?.parent == f.parentId && (
                <ItemContainer
                  key={i}
                  className={"flex flex-col items-center justify-center"}
                >
                  <FormLabel title={f.name} />

                  <Select
                    width="long"
                    requirement={
                      state?.[key] != undefined && state?.[key] != ""
                        ? false
                        : true
                    }
                    data={
                      f.value!.filter(
                        (v) => cacheParent.id == v.parentId || v.id == "other"
                      )?.length > 0
                        ? f.value?.filter(
                            (v) =>
                              cacheParent.id == v.parentId || v.id == "other"
                          )
                        : (
                            filter!.filter((fil) => fil.type == f.parentId)?.[0]
                              .value as ItemDetailModel[]
                          )?.filter(
                            (v) =>
                              v.id == "B2" ||
                              v.id == "B1" ||
                              parseInt(cacheParent.value ?? "0") >=
                                parseInt(v.id)
                          )
                    }
                    label={(state?.[key] as string) ?? f.name}
                    Item={(items: ItemType) => {
                      const { data, id, onClick, children } = items;
                      return (
                        <button
                          key={id}
                          {...items}
                          onClick={(e) => {
                            e.persist();

                            handle((prev) => ({ ...prev, [key]: data }));
                            if (cacheSelf != undefined) {
                              cacheSelf.value = data!;
                              cacheSelf.id = id!;
                            } else {
                              cache.push({
                                id: id!,
                                value: data!,
                                parent: f.type,
                              });
                            }
                            setCache((prev) => [...prev]);
                            
                            if (onClick != null) {
                              onClick();
                            }
                          }}
                        >
                          {data}
                          {children}
                        </button>
                      );
                    }}
                  />
                  {cacheParent.id == "other" ? (
                    <Fragment>
                      <Box h={4} />
                      <Input
                        ph={state?.[key] as string}
                        onChange={(num) =>
                          handle((prev) => ({ ...prev, [key]: num }))
                        }
                        value={
                          state?.[key] != "Бусад"
                            ? (state?.[key] as string)
                            : ""
                        }
                      />
                    </Fragment>
                  ) : (
                    <Box />
                  )}
                </ItemContainer>
              )
            );
          }
      })}
    </div>
  );
};
// 620
const Row = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 my-8 md:grid-cols-2">
      {children}
    </div>
  );
};

const Col = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center">{children}</div>
);

export const ItemContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={mergeNames("mb-4 lg:mb-10", className ?? "")}>{children}</div>
);

export default Step4;
