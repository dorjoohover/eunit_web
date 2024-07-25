import { imageApi } from "@/utils/values";
import { Image } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const ProfileImage = ({
  selectedImage,
  setSelectedImage,
  images,
  setImages,
}: {
  selectedImage: string | undefined;
  images?: File;
  setImages: React.Dispatch<React.SetStateAction<File | undefined>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [selected, setSelected] = useState(false)
  const imageChange = (files: FileList | null) => {
    if (files != null) {
      const selectedFilesArray = Array.from(files).map((file, i) => {
        return URL.createObjectURL(file);
      });
      Object.values(files)?.map((f, i) => {
        setImages(f);
      });
      setSelected(true)
      setSelectedImage(selectedFilesArray[0]);
    }
    
  };

  const removeSelectedImage = () => {
    setSelectedImage(undefined);
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (hiddenFileInput != null) {
      hiddenFileInput!.current!.click();
    }
  };

  return (
    <div className="">
      <input
        type="file"
        className="form-control"
        onChange={(e) => imageChange(e.target.files)}
        accept="image/*"
        style={{ display: "none" }}
        ref={hiddenFileInput}
      />

      {selectedImage ? (
        <div className="h-[25vh] relative rounded-md flex-col justify-center items-center ">
          <Image
            src={selected ? selectedImage : `${imageApi}${selectedImage}`}
            className="object-cover object-center w-full h-full overflow-hidden bg-gray-300 rounded-md aspect-square"
            alt="Thumb"
          />
          <div className="flex justify-between w-full">
            <p
              onClick={handleClick}
              className="float-right font-bold text-gray-500 cursor-pointer"
            >
              Зураг солих
            </p>
            <p
              onClick={removeSelectedImage}
              className="float-right font-bold text-red-400 cursor-pointer"
            >
              Устгах
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="border-2 w-full h-[25vh]  border-dotted border-blue-400 bg-blue-100/50 rounded-xl mx-auto aspect-square outline-none p-4 flex flex-col justify-center items-center"
        >
          <p>Зураг оруулах</p>
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
