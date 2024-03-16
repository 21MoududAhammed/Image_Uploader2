import { useRef, useState } from "react";
import uploadIcon from "../assets/uploadIcon.jpg";
import loadingIcon from "../assets/loadingIcon.png";

export default function ImageUploader() {
  const [profilePicture, setProfilePicture] = useState(uploadIcon);
  const inputRef = useRef();

  const handleUploadImage = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleDisplayImage = async (e) => {
    try {
      setProfilePicture(loadingIcon);
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("file", image);

      const res = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
        method: "post",
        body: formData,
      });

      if (res?.status === 201) {
        const data = await res.json();
        setProfilePicture(data?.location);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-52 h-52 rounded-full">
        <form action="">
          <img
            onClick={handleUploadImage}
            className="w-52 h-52 rounded-full"
            src={profilePicture}
            alt=""
          />
          <input
            ref={inputRef}
            onChange={handleDisplayImage}
            type="file"
            hidden
          />
        </form>
      </div>
    </div>
  );
}
