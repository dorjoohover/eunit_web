"use client";

import { useContext } from "react";

import { toast } from "react-toastify";
import { StoreContext } from "../../_context";

const AddToCart = ({ book }: { book: any }) => {
  const { cartData, setCartData } = useContext<any>(StoreContext);

  const handleCart = (e: any, reason: any) => {
    e.preventDefault();
    const newData = { ...book, type: reason };
    const found = cartData.find((item: any) => {
      return item.id === book.id;
    });
    if (!found) {
      setCartData([...cartData, newData]);
      toast.success(`Added ${book.title} to the Cart`, {
        autoClose: 1000,
        position: "top-right",
      });
    } else {
      toast.error(`OOPS!! You have added ${book.title} already to the Cart`, {
        position: "top-right",
      });
    }
  };
  return (
    <div className="flex justify-around mt-5 border-t-2 p-1">
      <button
        className="bg-purple-500  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={(event) => handleCart(event, "Buy")}
      >
        {/* <ShoppingCartIcon className="w-5 mr-0.5 inline" /> to Buy */}
      </button>
      <button
        className="bg-purple-500  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={(event) => handleCart(event, "Rent")}
      >
        {/* <ShoppingCartIcon className="w-5 mr-0.5 inline" /> to Rent */}
      </button>
    </div>
  );
};

export default AddToCart;
