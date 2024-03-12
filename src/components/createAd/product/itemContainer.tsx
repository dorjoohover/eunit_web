// import Tip from "@/lib/Tip";
// import Link from "next/link";
// import mergeNames from "../mergeNames";

// const ItemContainer = ({
//   Icon = () => <></>,
//   text = "",
//   lbl,
//   name,
//   href = false,
//   value,
//   id,
//   cateId,
//   txtWhite = false,
// }) => {
//   return (
//     <Tip lbl={lbl}>
//       <div
//         className={mergeNames(
//           "flex flex-col items-center",
//           txtWhite ? " text-white" : "text-mainBlossom"
//         )}
//       >
//         <Icon className="" />
//         <div className="flex items-center ">
//           <p className="text-xs md:text-sm">{name}&nbsp;</p>
//           {href ? (
//             <Link
//               href={{
//                 pathname: `/category/filter/${id}`,
//                 query: { num: 0, value: value, cateId: cateId },
//               }}
//             >
//               <p className="text-xs cursor-pointer md:text-sm">{text}</p>
//             </Link>
//           ) : (
//             <p className="md:text-sm text-[14px]">{text}</p>
//           )}
//         </div>
//       </div>
//     </Tip>
//   );
// };

// export default ItemContainer;
