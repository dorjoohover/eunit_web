// "use server";

// import {
//   ActionTypes,
//   ContentTypes,
//   SurveySortTypes,
//   SurveyTypes,
// } from "@/utils/enum";
// import { ErrorMessages } from "@/utils/string";
// import { url } from "@/utils/values";
// import { SurveyModel } from "@/models/Survey.model";

// export type ActionListenType = {
//   message?: string;
//   type?: ActionTypes;
//   data: SurveyModel;
// };

// export async function questionSet(
//   prevState: ActionListenType,
//   queryData: any
// ): Promise<ActionListenType> {
//   let data = { ...prevState.data };
//   const content = queryData.get("content");
//   const title = queryData.get("title");

//   if (content != "" && title != "") {
//     data.content = {
//       type: ContentTypes.TEXT,
//       content: content,
//     };
//     data.title = title;
//     try {
//       await fetch(`${url}/api/survey/${data._id}`, {
//         body: JSON.stringify(data),
//         method: "PUT",
//       });

//       return {
//         type: ActionTypes.SUCCESS,
//         message: ErrorMessages.success,
//         data: data,
//       };
//     } catch (error) {
//       console.error(error);

//       return {
//         type: ActionTypes.ERROR,
//         message: ErrorMessages.occured,
//         data: data,
//       };
//     }
//   }

//   return {
//     type: ActionTypes.INFO,
//     message: ErrorMessages.info,
//     data: data,
//   };
// }

// export async function getDataBySort(
//   type: SurveySortTypes
// ): Promise<Array<SurveyModel>> {
//   try {
//     let res = await fetch(`${url}/api/survey/${type}`, {}).then(
//       async (d) => await d.json()
//     );

//     return res as Array<SurveyModel>;
//   } catch (error) {
//     console.log(error);
//     throw new Error(`${JSON.stringify(error)}`);
//   }
// }

// export async function createForm(): Promise<SurveyModel> {
//   try {
//     let res = await fetch(`${url}/api/survey`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ type: SurveyTypes.QUESTION }),
//     }).then(async (d) => await d.json());

//     return res;
//   } catch (error) {
//     console.log(error);
//     throw new Error(`${JSON.stringify(error)}`);
//   }
// }
// export async function deleteSurveyById(id: string): Promise<boolean> {
//   try {
//     let res = await fetch(`${url}/api/survey/${id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ type: SurveyTypes.QUESTION }),
//     }).then(async (d) => await d.json());

//     return res;
//   } catch (error) {
//     return false;
//   }
// }
