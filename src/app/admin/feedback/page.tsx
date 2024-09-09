"use client";
import { getFeedback } from "@/app/(api)/user.api";
import { ContainerX } from "@/components/container";
import { FeedbackModel } from "@/models/feedback.model";
import { UserModel } from "@/models/user.model";
import { useEffect, useState } from "react";

const FeedbackPage = () => {
  const [feedback, setF] = useState<FeedbackModel[]>([]);
  const getFeedbacks = async () => {
    await getFeedback().then((d) => {
      if (d != false) {
        setF(d);
      }
    });
  };
  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <ContainerX className="p-2 my-5">
      <table className="table-auto border border-gray-400">
        <thead>
          <tr>
            <th>Нэр</th>
            <th className="w-1/2">Гарчиг</th>
            <th className="w-1/2">Дэлгэрэнгүй</th>
          </tr>
        </thead>

        <tbody>
          {feedback?.map((d, i) => {
            return (
              <tr key={i}>
                <td> {(d.user as UserModel)?.username}</td>
                <td> {d.title}</td>
                <td>{d.message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ContainerX>
  );
};
export default FeedbackPage;
