"use client";
import { useState } from "react";

export const useAd = () => {
  const [state, setState] = useState({});
  const [id, setId] = useState({});
  const [index, setIndex] = useState({});
  const [position, setPosition] = useState({});
  const [isSearch, setSearch] = useState({});

  const handle = (
    name: string,
    value: string,
    type: string,
    i: number,
    pos: number,
    search: string
  ) => {
    setState((state) => ({ ...state, [name]: value }));
    setIndex((prev) => ({ ...prev, [name]: i }));
    setPosition((prev) => ({ ...prev, [name]: pos }));
    setSearch((prev) => ({ ...prev, [name]: search }));
    if (type != "" && type != null) {
      setId((prev) => ({ ...prev, [name]: type }));
    }
  };
  return [state, handle, id, index, position, isSearch];
};
export default useAd;
