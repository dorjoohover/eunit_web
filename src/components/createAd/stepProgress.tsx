// import mergeNames from '@/util/mergeNames';

// // const NumberText = (props) => {
// //   return <p className="font-semibold text-blue-500">{props.children}</p>;
// // };

// const StepItem = ({
//   stepId = -1,
//   activeStep = -1,
//   sharing = false,
//   handleClick = () => {},
// }) => {
//   const isActive = stepId === activeStep;
//   return (
//     <button
//       onClick={() => handleClick(stepId)}
//       className={mergeNames(
//         'transition-all hover:bg-blue-500 hover:text-white',
//         isActive ? 'text-white font-bold' : 'text-blue-500 font-semibold',
//         'rounded-full border-2 md:w-12 md:h-12 w-8 h-8 flex items-center justify-center ',
//         isActive ? 'bg-blue-400 border-blue-400' : 'bg-gray-50 border-blue-400'
//       )}
//     >
//       <p className={mergeNames('md:text-2xl text-base')}>
//         {sharing ? stepId + 3 : stepId + 2}
//       </p>
//     </button>
//   );
// };

// const StepProgress = ({
//   activeStep = 1,
//   // hasFourStep = false,
//   sharing = false,
//   handleClick = () => {},
// }) => {
//   return (
//     <div className="relative w-full mb-4 md:mb-8" id="progress">
//       <div className="h-1 w-full bg-blue-500/50 absolute top-4 z-[-1] rounded-md" />
//       <div className="flex w-full justify-evenly">
//         {sharing && (
//           <StepItem
//             stepId={-2}
//             sharing={sharing}
//             {...{ activeStep }}
//             handleClick={handleClick}
//           />
//         )}
//         <StepItem
//           stepId={-1}
//           sharing={sharing}
//           {...{ activeStep }}
//           handleClick={handleClick}
//         />
//         <StepItem
//           stepId={0}
//           sharing={sharing}
//           {...{ activeStep }}
//           handleClick={handleClick}
//         />
//         <StepItem
//           stepId={1}
//           sharing={sharing}
//           {...{ activeStep }}
//           handleClick={handleClick}
//         />
//         {/* {hasFourStep && ( */}
//         <StepItem
//           stepId={2}
//           sharing={sharing}
//           {...{ activeStep }}
//           handleClick={handleClick}
//         />

//         {/* )} */}
//       </div>
//     </div>
//   );
// };

// export default StepProgress;
