// "use client";
// import { Colors, Sizes } from "@/base/constants";
// import { locale } from "@/base/vocabs/mn";
// import { Button } from "@mantine/core";
// import { atob } from "buffer";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useRef, useState } from "react";
// // import SignatureCanvas from "react-signature-canvas";

// export const Signature: React.FC = () => {
//   // const sigCanvas = useRef<SignatureCanvas>(null);
//   const [data, setData] = useState<string | null>(null);
//   const clearSignature = () => {
//     sigCanvas.current?.clear();
//   };

//   const saveSignature = () => {
//     if (sigCanvas.current) {
//       const dataURL = sigCanvas.current
//         .getTrimmedCanvas()
//         .toDataURL("image/png");
//       setData(dataURL);
//     }
//   };

//   return (
//     <div className={"flex w-full flex-col relative"}>
//       <SignatureCanvas
//         ref={sigCanvas}
//         penColor="black"
//         canvasProps={{
//           className: `border border-[${Colors.stroke}] rounded-[0.625rem] bg-white w-full h-[250px] z-40`,
//         }}
//       />
//       <Button
//         unstyled
//         onClick={saveSignature}
//         c={"stroke"}
//         className={`absolute top-[10px] right-[20px] z-50 underline`}
//       >
//         {locale.data.FILTER_ATTRIBUTE.CLEAR}
//       </Button>
//       <Button unstyled onClick={saveSignature}>
//         save
//       </Button>
//       {data != null && <Image alt="" width={300} height={200} src={data} />}
//     </div>
//   );
// };
