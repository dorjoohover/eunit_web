// import { LoadingButton } from "@/lib/Button";
// import CustomModal from "@/util/CustomModal";
// import mergeNames from "@/util/mergeNames";
// import WhiteBox from "@/util/product/WhiteBox";
// import { Box, Heading,  useDisclosure } from "@chakra-ui/react";
// import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

// import { useMemo } from "react";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import ImageGallery from "react-image-gallery";
// const ButtonProcess = () => {
//   return (
//     <div className="relative w-full h-5 overflow-hidden bg-emerald-700/30 rounded-xl">
//       <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 h-5 w-[10vw]" />
//       <p className="absolute top-0 left-[10vw] bottom-0 flex justify-center items-center font-semibold">
//         10%
//       </p>
//     </div>
//   );
// };

// const StepButtons = ({
//   onPrev = () => {},
//   loading = false,
//   onNext = () => {},
//   sharing = false,
//   data,
//   generalData,
//   txt = "Дараах",
//   filter,
//   step,
//   setStep,
//   map,
//   selectedParent,
// }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const libraries = useMemo(() => ["places"], []);
//   // const { categories, setAds } = useAuth();

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
//     libraries: libraries,
//   });
//   const mapOptions = useMemo(
//     () => ({
//       disableDefaultUI: true,
//       clickableIcons: true,
//       scrollwheel: true,
//     }),
//     []
//   );
//   const mapCenter = useMemo(
//     () => ({
//       lat: parseFloat(map?.lat ?? 47.91887307876936),
//       lng: parseFloat(map?.lng ?? 106.91757202148438),
//     }),
//     [map]
//   );

//   const top = () => {
//     // window.scrollTo(0, 0);
//   };

//   return (
//     <div className="mt-4">
//       {/* <ButtonProcess /> */}
//       <div className="flex flex-row justify-between pt-2">
//         <button
//           onClick={onPrev}
//           className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-red-400 rounded-full"
//         >
//           <FiArrowLeft size={20} />
//           Буцах
//         </button>

//         {step == 2 ? (
//           <CustomModal
//             isOpen={isOpen}
//             onClose={onClose}
//             onOpen={onOpen}
//             btnOpen={
//               <>
//                 Дараах <FiArrowRight size={20} />
//               </>
//             }
//             onclick={onNext}
//             btnClose={<LoadingButton text="Илгээх" isLoading={loading} />}
//             btnClose2="Буцах"
//             header="Нэгтгэсэн мэдээлэл"
//           >
//             <Box maxWidth={"100%"} flex="0 0 100%" borderRadius="5px">
//               <div className="flex flex-col w-full p-3 shadow-md gap-7 bg-bgGrey md:p-10 rounded-xl">
//                 {/*Product */}
//                 {generalData.title && (
//                   <Heading
//                     variant={"mediumHeading"}
//                     mb={5}
//                     onClick={() => {
//                       onClose(), setStep(1);
//                     }}
//                   >
//                     {generalData.title}
//                   </Heading>
//                 )}
//                 <Box
//                   className={mergeNames(
//                     "product__image",
//                     "border-2 border-blue-900/20 shadow-md gallery"
//                   )}
//                   onClick={() => {
//                     onClose(), setStep(1);
//                   }}
//                 >
//                   {generalData?.images ? (
//                     <ImageGallery
//                       thumbnailPosition="left"
//                       showNav={false}
//                       showFullscreenButton={false}
//                       items={generalData?.images.map((i) => ({
//                         original: i,
//                         thumbnail: i,
//                       }))}
//                       className="object-contain"
//                     />
//                   ) : (
//                     // ene er ustgagdah ulaan shuu
//                     <div className="grid w-full font-bold h-[30vh] bg-gray-700 text-white aspect-square place-items-center text-md">
//                       Энэ заранд зураг байхгүй байна
//                     </div>
//                   )}
//                 </Box>
//                 <WhiteBox
//                   heading="Хаяг"
//                   classnames="grid xs:grid-cols-2 xl:grid-cols-4 gap-5"
//                 >
//                   {filter?.map((p) => {
//                     if (p.step == "location") {
//                       return p.values.map((v, i) => {
//                         return (
//                           <ProductInfo
//                             key={i}
//                             title={v.name}
//                             id={p.parent ?? ""}
//                             value={data[v.type]}
//                             func={() => {
//                               onClose(), setStep(0);
//                             }}
//                             href={false}
//                           />
//                         );
//                       });
//                     }
//                   })}
//                 </WhiteBox>

//                 <div className="grid grid-cols-1 gap-7 ">
//                   <WhiteBox heading="Газрын зураг">
//                     <GoogleMap
//                       onClick={() => {
//                         onClose(), setStep(0);
//                       }}
//                       options={mapOptions}
//                       zoom={14}
//                       center={mapCenter}
//                       mapTypeId={google.maps.MapTypeId.ROADMAP}
//                       mapContainerStyle={{ width: "100%", height: "30vh" }}
//                     >
//                       {isLoaded && (
//                         <div>
//                           <MarkerF
//                             position={{
//                               lat: parseFloat(map?.lat ?? 47.74604),
//                               lng: parseFloat(map?.lng ?? 107.341515),
//                             }}
//                             animation={google.maps.Animation.DROP}
//                             className={mergeNames("group")}
//                           />
//                         </div>
//                       )}
//                     </GoogleMap>
//                   </WhiteBox>
//                 </div>
//                 {data && (
//                   <WhiteBox
//                     heading="Мэдээлэл"
//                     classnames="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4"
//                   >
//                     <ProductInfo
//                       title={"Үнэ"}
//                       id={"price"}
//                       value={generalData.price ?? ""}
//                       func={() => {
//                         onClose(), setStep(1);
//                       }}
//                       href={false}
//                     />
//                     <ProductInfo
//                       title={"Нэгж талбайн үнэ"}
//                       id={"unitPrice"}
//                       value={generalData.unitPrice ?? ""}
//                       func={() => {
//                         onClose(), setStep(1);
//                       }}
//                       href={false}
//                     />
//                     <ProductInfo
//                       title={"Талбай"}
//                       id={generalData.area ?? ""}
//                       value={generalData.area ?? ""}
//                       func={() => {
//                         onClose(), setStep(1);
//                       }}
//                       href={false}
//                     />
//                     <ProductInfo
//                       title={"Утас"}
//                       id={generalData.phone ?? ""}
//                       value={generalData.phone ?? ""}
//                       func={() => {
//                         onClose(), setStep(1);
//                       }}
//                       href={false}
//                     />
//                     {filter?.map((p) => {
//                       if (p.step == "detail") {
//                         return p.values.map((v, i) => {
//                           return (
//                             <ProductInfo
//                               key={i}
//                               title={v.name}
//                               id={p.parent ?? ""}
//                               value={data[v.type]}
//                               func={() => {
//                                 onClose(), setStep(2);
//                               }}
//                               href={false}
//                             />
//                           );
//                         });
//                       }
//                     })}
//                   </WhiteBox>
//                 )}
//                 {data && (
//                   <WhiteBox heading={"file"}>
//                     <p>{generalData[0].file.name}</p>
//                   </WhiteBox>
//                 )}
//               </div>
//             </Box>
//           </CustomModal>
//         ) : (
//           <button
//             disabled={loading}
//             onClick={onNext}
//             className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 rounded-full a"
//           >
//             {txt}
//             <FiArrowRight size={20} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StepButtons;
