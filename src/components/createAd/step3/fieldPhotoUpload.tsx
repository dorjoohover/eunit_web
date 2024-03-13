import React, { Dispatch, SetStateAction } from "react";
import { BiX } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";
import { AtomLabel } from "./atom";
import { StepTypes } from "@/utils/type";

const FieldPhotoUpload = <T,>({
  data,
  setImages,
  images,
  setData,
  label,
}: {
  setData: Dispatch<SetStateAction<any>>;
  data: any;

  label?: string;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  // saving IMAGES locally
  const [selectedImages, setSelectedImages] = React.useState<string[]>(
    data.images
  );
  const [isImageSelected, setIsImageSelected] = React.useState(
    data?.imgSelected
  );

  const handleClick = () => {
    if (hiddenFileInput != null) {
      hiddenFileInput!.current!.click();
    }
  };

  const handleChange = (files: FileList | null) => {
    if (files != null && selectedImages != null) {
      const selectedFilesArray: File[] = Array.from(files).slice(
        0,
        8 - selectedImages.length
      );

      const imagesArray = selectedFilesArray
        .map((file, i) => {
          return URL.createObjectURL(file);
        })
        .slice(0, 8 - selectedImages.length);
      if (selectedImages.length < 8) {
        setSelectedImages((prev: typeof data) => [...prev!, ...imagesArray]);
        Object.values(files)?.map((f, i) => {
          setImages((images) => [...images, f]);
        });
      }
      setIsImageSelected(true);
      setData((prev: typeof data) => ({
        ...prev,
        imgSelected: true,
        images: [...prev.images!, ...imagesArray],
      }));
    }
    // FOR BUG IN CHROME
  };

  function deleteHandler(image: string) {
    // IF ALL IMAGES ARE GONE, SETTING STATUS FALSE
    if (selectedImages?.length === 1) {
      setData((prev: typeof data) => ({ ...prev, imgSelected: false }));
      setIsImageSelected(false);
    }

    setSelectedImages(selectedImages!.filter((e, i) => e !== image && i < 8));
    if (images) setImages(images.filter((e, i) => e.name !== image && i < 8));
    setData((prev: typeof data) => ({
      ...prev,
      imgSelected: true,
      images: selectedImages!.filter((e, i) => e !== image && i < 8),
    }));

    URL.revokeObjectURL(image);
  }

  return (
    <div className="">
      <div className="flex items-center justify-between w-full">
        <AtomLabel>{label ?? "Зураг оруулах"}</AtomLabel>
        <p className="font-semibold">{selectedImages!.length}/8</p>
      </div>
      <>
        <input
          type="file"
          // accept={'image/*'}
          name="files"
          accept={"image/jpeg, image/png, image/jpg"}
          ref={hiddenFileInput}
          style={{ display: "none" }}
          multiple
          onChange={(e) => handleChange(e.target.files)}
        />
        {isImageSelected ? (
          <div className="grid w-full h-full grid-cols-2 gap-4 p-4 overflow-hidden border-2 border-blue-400 border-dotted outline-none md:grid-cols-3 bg-blue-100/50 rounded-xl">
            {selectedImages?.map((image, key) => {
              return (
                <div
                  key={key}
                  className="h-[20vh] relative rounded-md flex justify-center items-center"
                >
                  <img
                    src={image}
                    alt="image"
                    className="object-cover object-center w-full h-full overflow-hidden bg-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => deleteHandler(image)}
                    className="absolute text-white transition-all bg-gray-500 rounded-full -bottom-2 -right-2 hover:bg-red-500"
                  >
                    <BiX size={30} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <button
            onClick={handleClick}
            className="border-2 w-full min-h-[25vh] h-full border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4 flex flex-col justify-center items-center"
          >
            <FiUploadCloud size={90} className="text-blue-400" />
            <p>Зураг оруулах</p>
          </button>
        )}
        {isImageSelected && (
          <button
            className="px-4 py-1 mt-4 text-white bg-blue-500 rounded-md"
            onClick={handleClick}
          >
            Зураг нэмэх
          </button>
        )}
      </>
    </div>
  );
};

export default FieldPhotoUpload;
