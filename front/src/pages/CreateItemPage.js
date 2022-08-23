import BaseCard from "../components/UI/BaseCard";
import { Link } from "react-router-dom";
// import { storage } from "../firebase";
// import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";

export default function CreateItemPage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const uploadImage = (event) => {
    event.preventDefault();
    // if (imageUpload == null) return;
    setImageTitle(v4());
    console.log(imageTitle);
    console.log(imageUpload);
    setUploadStatus(false)   

    // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    // uploadBytes(imageRef, imageUpload).then((url) => {
    //   alert("Image Uploaded Successfuly");
    //   setUploadStatus(true);
    //   setImageUpload(null)
    // });
  };
  return (
    <>
      <Link to=""></Link>
      <BaseCard>
        <form>
          <h2>Create Item</h2>
          <div className="form-tem">
            <label className="form-label" htmlFor="title" required>
              Title
            </label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              className="form-control"
            ></textarea>
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="image">
              Image
            </label>
            <div className="">
              <input
                className="form-control"
                type="file"
                onChange={(event) => {
                  if (uploadStatus) event.target.files[0] = null;
                  setImageUpload(event.target.files[0]);
                }}
              />
              {!uploadStatus ? (
                <button
                  onClick={uploadImage}
                  className="btn btn-secondary form-button"
                >
                  Upload Photo
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </BaseCard>
    </>
  );
}
