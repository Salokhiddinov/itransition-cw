import BaseCard from "../components/UI/BaseCard";
import { Link, useParams } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import axios from "../plugins/axios";
import Loader from "../components/UI/Loader";

export default function CreateItemPage() {
  const navigate = useNavigate();

  const [dataUploading, setDataUploading] = useState(false);

  const [imageUpload, setImageUpload] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [price, setPrice] = useState(false);
  const [year, setYear] = useState(false);
  const [from, setFrom] = useState(false);
  const [link, setLink] = useState(false);

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const nameRef = useRef("");
  const descriptionRef = useRef(null);
  const [priceRef, setPriceRef] = useState("");
  const [yearRef, setYearRef] = useState("");
  const [fromRef, setFromRef] = useState("");
  const [linkRef, setLinkRef] = useState("");
  const imageTitle = v4();

  const tagInput = useRef("");

  let { username, collectionID } = useParams();

  const additionalFields = (
    <div>
      <br />
      <br />
      <h3>Add more inputs</h3>
      {!price ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setPrice(true);
          }}
        >
          Price
        </span>
      ) : null}
      {!year ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setYear(true);
          }}
        >
          Year
        </span>
      ) : null}
      {!from ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setFrom(true);
          }}
        >
          From
        </span>
      ) : null}
      {!link ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setLink(true);
          }}
        >
          Link
        </span>
      ) : null}
      <br />
      <br />
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataUploading(true);
    const nameInput = nameRef.current.value;
    const descriptionInput = descriptionRef.current.value;
    const priceInput = priceRef;
    const yearInput = yearRef;
    const fromInput = fromRef;
    const linkInput = linkRef;

    try {
      const data = {
        username: username,
        collectionID: collectionID,
        name: nameInput,
        description: descriptionInput,
        image: imageUpload ? imageTitle : "",
        tags: tags,
        price: priceInput ? priceInput : "",
        year: yearInput ? yearInput : "",
        from: fromInput ? fromInput : "",
        link: linkInput ? linkInput : "",
        customInputs: "",
      };
      await axios
        .post(`item/create/${username}/${collectionID}`, data)
        .then(() => {
          //Upload Image
          const uploadImage = (e) => {
            if (imageUpload == null) return;
            setUploadStatus(false);
            const imageRef = ref(storage, `images/${imageTitle}`);
            uploadBytes(imageRef, imageUpload).then((url) => {
              //   alert("Image Uploaded Successfuly");
              setUploadStatus(true);
              setImageUpload(null);
            });
          };
          uploadImage();
        });
      window.location.href = `/collection/${collectionID}`;
    } catch (err) {
      alert("Something went wrong");
      console.error(err);

      return false;
    }
  };
  function addTag(e) {
    e.preventDefault();
    if (tagInput.current.value === "") {
      alert("Tag Field cannot be empty! Please, check your input");
      return false;
    }
    setTag("");
    tags.push({
      id: v4(),
      tag: tag,
    });
    tagInput.current.value = "";
    console.log(tags);
  }

  function removeTag(id) {
    setTags(tags.filter((tag) => tag.id !== id));
  }

  return (
    <>
      {dataUploading ? (
        <Loader />
      ) : (
        <div>
          <Link to="" className="link-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faLeftLong} /> Go Back
          </Link>
          <BaseCard>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h2>Create Item</h2>
              <div className="form-item">
                <br />
                <label className="form-label" htmlFor="name" required>
                  Name
                </label>
                <input className="form-control" type="text" ref={nameRef} />
              </div>
              <div className="form-item">
                <br />
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="form-control"
                  ref={descriptionRef}
                ></textarea>
              </div>
              <div className="form-item">
                <br />
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
                </div>
                <div className="form-item">
                  <br />
                  <label className="form-label" htmlFor="title" required>
                    Tags
                  </label>
                  <div className="d-flex justify-content-between">
                    <input
                      className="form-control input-inline"
                      type="text"
                      ref={tagInput}
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                    <button
                      className="btn btn-secondary btn-inline"
                      onClick={(e) => {
                        addTag(e);
                      }}
                    >
                      Add tag
                    </button>
                  </div>
                </div>
                <div className="form-item tags">
                  {tags.map((t) => {
                    return (
                      <span className=" tag" key={t.id}>
                        {t.tag}
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="tag-remove-icon"
                          onClick={() => {
                            removeTag(t.id);
                          }}
                        />
                      </span>
                    );
                  })}
                </div>
                {!price || !year || !from || !link ? additionalFields : null}
                {price ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="price">
                      Price
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input-inline"
                        type="text"
                        onChange={(e) => setPriceRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setPrice(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {year ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="year">
                      Year
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input-inline"
                        type="text"
                        onChange={(e) => setYearRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setYear(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {from ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="from">
                      From (Place)
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input-inline"
                        type="text"
                        onChange={(e) => setFromRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setFrom(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {link ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="link">
                      Link to website
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input-inline"
                        type="text"
                        onChange={(e) => setLinkRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setLink(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <button className="btn btn-success btn-submit" type="submit">
                Submit
              </button>
            </form>
          </BaseCard>
        </div>
      )}
    </>
  );
}
