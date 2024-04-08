"use client"
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicIds, setPublicIds] = useState<string[]>([]);

  const handleUpload = (results: any[]) => {
    const newPublicIds = results
      .filter((result) => result.event === "success")
      .map((result) => (result.info as CloudinaryResult).public_id);

    setPublicIds((prevPublicIds) => [...prevPublicIds, ...newPublicIds]);
  };

  return (
    <div>
      {publicIds.map((publicId) => (
        <CldImage
          key={publicId}
          src={publicId}
          width={270}
          height={180}
          alt="Uploaded Image Not Found"
        />
      ))}
      <CldUploadWidget
        uploadPreset="kymakj5i"
        onUpload={handleUpload}
        maxFiles={10} // Set maximum number of files to 10
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload Images
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadPage;
