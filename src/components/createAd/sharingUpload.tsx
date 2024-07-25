import { AtomLabel } from "@/components/createAd/step3/atom";
import { Image, Link } from "@chakra-ui/react";

import React, { useState } from "react";

import { BiX } from "react-icons/bi";
import { MdPictureAsPdf } from "react-icons/md";

// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const SharingUpload = ({
  onChange,
  data,
}: {
  onChange: (e: File) => void;
  data: File | null;
}) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput!.current!.click();
  };

  const fileType = ["application/pdf"];
  const handleChange = (e: FileList | null) => {
    // let selectedFile = e.target.files[0];
    if (e != null) {
      let selectedFile = e[0];
      if (selectedFile && fileType.includes(selectedFile.type)) {
        onChange(selectedFile);
      } else {
      }
    }
  }
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   if (pdfFile !== null) {
    //     setViewPdf(pdfFile);
    //   } else {
    //     setViewPdf(null);
    //   }
    // };
    // const newplugin = defaultLayoutPlugin();

    return (
      <div className="">
        <AtomLabel>{"1 PDF зураг оруулах"}</AtomLabel>

        <form action="">
          <input
            type="file"
            name="upload"
            accept="application/pdf"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={(e) => handleChange(e.target.files)}
          />
        </form>
        <button
          onClick={handleClick}
          className="flex px-4 py-2 mx-auto my-3 text-white bg-blue-500 rounded-sm"
        >
          Зураг сонгох
        </button>

        {data ? (
          <div className="grid w-full h-full grid-cols-2 gap-4 p-4 overflow-hidden border-2 border-blue-400 border-dotted outline-none md:grid-cols-3 bg-blue-100/50 rounded-xl">
            <div className="h-[10vh] relative rounded-md flex justify-center items-center">
              <p>{data?.name}</p>

              {/* <button
              onClick={() => deleteHandler(image)}
              className="absolute text-white transition-all bg-gray-500 rounded-full -bottom-2 -right-2 hover:bg-red-500"
            >
              <BiX size={30} />
            </button> */}
            </div>
          </div>
        ) : (
          <button className="border-2 w-full min-h-[20vh] h-full border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4 flex flex-col justify-center items-center">
            <MdPictureAsPdf size={90} className="text-blue-400" />
            <p>PDF зураг</p>
          </button>
        )}
        {/* 
        <PDFview />
        <Pdfer /> */}

        {/* <form className="form-group" onSubmit={handleSubmit}>
          <input type="file" className="form-control" onChange={handleChange} />

          <button type="submit" className="btn btn-success btn-lg">
            UPLOAD
          </button>
        </form>
        <br></br>
        <h4>View PDF</h4>
        <div className="pdf-container">
          <Worker workerUrl="https://unpkg.com/@react-pdf-viewer/pdfjs-dist-signature@2.5.207/build/pdf.worker.min.js">
            {viewPdf && (
              <>
                <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
              </>
            )}
            {!viewPdf && <>No pdf file selected</>}
          </Worker>
        </div> */}
      </div>
    );
  };

export default SharingUpload;
