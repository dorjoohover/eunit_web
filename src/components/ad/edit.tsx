// import { Box, Input, Textarea, useDisclosure } from "@chakra-ui/react";
// import {
//   GoogleMap,
//   Libraries,
//   MarkerF,
//   useLoadScript,
// } from "@react-google-maps/api";

// import { useMemo, useState } from "react";
// import FieldPhotoUpload from "../createAd/step3/fieldPhotoUpload";
// import CustomModal from "../global/customModal";
// import { LoadingButton } from "../global/button";
// import mergeNames from "@/utils/functions";
// import WhiteBox from "../createAd/product/whiteBox";
// import { ProductInfo } from "@/app/ad/[slug]/page";

// const EditAd = ({
//   onNext = () => {},
//   data,
//   setData,
//   admin = false,
//   ads = [],
//   setGeneralData,
//   setImages,
//   generalData,
//   children,
//   images,
// }) => {
//   const libraries = useMemo(() => ["places"], []);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [markerActive, setMarkerActive] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
//     libraries: libraries as Libraries,
//   });
//   const mapOptions = useMemo(
//     () => ({
//       disableDefaultUI: true,
//       // clickableIcons: true,
//       scrollwheel: true,
//     }),
//     []
//   );
//   const mapCenter = useMemo(
//     () => ({
//       lat: data?.location?.lat ?? 47.91887307876936,
//       lng: data?.location?.lng ?? 106.91757202148438,
//     }),
//     []
//   );
//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }
//   let dummyData = { ...data };

//   return (
//     <CustomModal
//       isOpen={isOpen}
//       onClose={onClose}
//       onOpen={onOpen}
//       btnOpen={
//         <p className="w-full text-center">{children ?? "Зараа засах"}</p>
//       }
//       onclick={onNext}
//       btnClose={<LoadingButton text="Засах" isLoading={loading} />}
//       btnClose2="Буцах"
//       header="Баталгаажуулах хэсэг"
//     >
//       <Box maxWidth={"100%"} flex="0 0 100%" borderRadius="5px">
//         <Box className="p-3 bg-white shadow-md md:p-10 rounded-xl">
//           {/*Product */}
//           {
//             <Input
//               variant={"mediumHeading"}
//               onChange={(e) => {
//                 if (!admin) {
//                   dummyData.title = e.target.value;
//                   setData(dummyData);
//                 } else {
//                   let d = { ...ads };
//                   d.ads.find((a) => data == a).title = e.target.value;

//                   setData(d);
//                 }
//               }}
//               mb={5}
//               value={data.title}
//             />
//           }

//           {/* product image and information */}
//           <div className="flex flex-col ">
//             <div>
//               {data?.images && (
//                 <FieldPhotoUpload
//                   images={images}
//                   setImages={setImages}
//                   data={generalData}
//                   setData={setGeneralData}
//                 />
//               )}

//               <Box h={4} />
//               <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
//                 <Textarea
//                   className="h-full"
//                   onChange={(e) => {
//                     dummyData.description = e.target.value;
//                     if (!admin) {
//                       setData(dummyData);
//                     } else {
//                       //   let d = { ...ads };
//                       //   d.ads.find((a) => data == a).title = e.target.value;
//                       //   setData(d);
//                     }
//                   }}
//                 >
//                   {data.description}
//                 </Textarea>
//                 <GoogleMap
//                   onClick={(e) => {
//                     const latLng = e.latLng;
//                     if (latLng != null) {
//                       dummyData.location = latLng.toJSON();
//                       if (!admin) {
//                         setData(dummyData);
//                       } else {
//                         data = dummyData;
//                       }
//                     }
//                   }}
//                   options={mapOptions}
//                   zoom={14}
//                   center={mapCenter}
//                   mapTypeId={google.maps.MapTypeId.ROADMAP}
//                   mapContainerStyle={{ width: "100%", height: "40vh" }}
//                 >
//                   {isLoaded && (
//                     <div>
//                       <MarkerF
//                         position={{
//                           lat: parseFloat(data?.location?.lat ?? 47.74604),
//                           lng: parseFloat(data?.location?.lng ?? 107.341515),
//                         }}
//                         animation={google.maps.Animation.DROP}
//                         // className={mergeNames("group")}
//                       />
//                     </div>
//                   )}
//                 </GoogleMap>
//               </div>
//             </div>
//             <Box h={4} />

//             {data && (
//               <WhiteBox
//                 heading="Мэдээлэл"
//                 className="grid xs:grid-cols-2 xl:grid-cols-4 gap-5"
//               >
//                 {data?.filters?.map((p, i) => {
//                   return (
//                     <ProductInfo
//                       key={i}
//                       title={p.name}
//                       id={p.parent}
//                       value={p.input}
//                       edit={true}
//                       href={false}
//                       type={p.type}
//                       admin={admin}
//                       setEditData={setData}
//                       editData={data}
//                       // classnames={mergeNames(
//                       //   (p.type == 'committee' ||
//                       //     p.type == 'district' ||
//                       //     p.type == 'location' ||
//                       //     p.type == 'town' ||
//                       //     p.type == 'officeName' ||
//                       //     p.type == 'buildingName') &&
//                       //     'bg-red-500 row-start'
//                       // )}
//                     />
//                   );
//                 })}
//               </WhiteBox>
//             )}
//           </div>
//         </Box>
//       </Box>
//     </CustomModal>
//   );
// };
// export default EditAd;
