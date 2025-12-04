"use client";

import { useState } from "react";

type ToastMessageProps = {
  message: string;
  type?: "success" | "error";
};

export default function ToastMessage({ message, type = "success" }: ToastMessageProps) {
  const bg =
    type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-[30px] py-[20px] rounded-lg shadow-lg text-white ${bg} animate-fade-in animate-slide-in-right`}
    >
      {message}
    </div>
  );
}
