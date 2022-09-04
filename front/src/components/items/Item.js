import BaseCard from "../UI/BaseCard";
import Loader from "../UI/Loader";
import ItemControls from "./ItemControls";
import axios from "../../plugins/axios";
import "./Item.modules.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

// import Backdrop from "./UI/Backdrop";
import Modal from "../UI/Modal";
import { useEffect } from "react";
let refreshRate = 0;
export default function Item(props) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const currentUsername = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(currentUsername);

  const noImage =
    "https://media.istockphoto.com/vectors/no-image-available-picture-coming-soon-missing-photo-image-vector-id1379257950?b=1&k=20&m=1379257950&s=170667a&w=0&h=RyBlzT5Jt2U87CNkopCku3Use3c_3bsKS3yj6InGx1I=";

  const checkIfLiked = () => {
    likes.find((username) => {
      if (username === currentUser.username) {
        setLiked(true);
      }
      return true;
    });
  };
  setInterval(() => {
    refreshRate++;
  }, 2000);
  useEffect(() => {
    setLikes([]);
    likes.push(...props.item.likes);
    checkIfLiked();
    // eslint-disable-next-line
  }, [refreshRate]);

  const toggleLike = async (username, itemID) => {
    setLoading(true);
    checkIfLiked();
    if (liked) {
      await axios.put(`item/unlike`, { username, itemID });
      likes.filter((like) => {
        console.log(like);

        return like !== username;
      });
      setLiked(false);
    }
    if (!liked) {
      await axios.put(`item/like`, { username, itemID });
      likes.push(...username);
      setLiked(true);
    }
    setLoading(false);
  };
  const getDate = (date) => {
    const date1 = new Date(date);
    return new Intl.DateTimeFormat().format(date1);
  };
  const sendComment = async () => {
    setLoading(true);
    const comment = {
      commentID: v4(),
      username: currentUser.username,
      comment: commentInput,
    };
    if (commentInput.trim() !== "") {
      await axios.put(`item/comment/${props.item._id}`, comment).then(() => {
        setLoading(false);
        setCommentInput("");
      });
    } else {
      alert("Comment cannot be empty");
      return false;
    }
  };
  return (
    <>
      <BaseCard>
        <div className="item">
          <div className="flexcontainer">
            <div className="image">
              {props.item.image === "" ? (
                <img src={noImage} alt="" />
              ) : (
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/itransition-a1be2.appspot.com/o/images%2F${props.item.image}?alt=media`}
                  alt={props.item.image}
                />
              )}
            </div>
            <div>
              <h3>{props.item.name}</h3>

              <Link className="fst-italic" to={`/user/${props.item.username}`}>
                @{props.item.username}
              </Link>
              <p>
                {t("i-description")}:{" "}
                {props.item.description.trim() === ""
                  ? t("i-no-description")
                  : props.item.description}
              </p>
              {props.item.price && (
                <p>
                  {t("i-price")}: ${props.item.price}
                </p>
              )}
              {props.item.year && (
                <p>
                  {t("i-year")}: {props.item.year}
                </p>
              )}
              {props.item.from && (
                <p>
                  {t("i-from")}: {props.item.from}
                </p>
              )}
              {props.item.link && (
                <p>
                  {t("i-link")}: <a href={props.item.link}>{props.item.link}</a>
                </p>
              )}

              <div className="tags">
                {props.item.tags.map((tag) => {
                  return (
                    <span className="tag" key={tag.id}>
                      {tag.tag}
                    </span>
                  );
                })}
              </div>
            </div>
            {props.item.username === currentUser.username ||
            currentUser.admin ? (
              <ItemControls className="control" item={props.item} />
            ) : null}
          </div>
          <div className="likes">
            <div className="like">
              <button onClick={toggleLike} className="btn btn-light">
                {liked ? (
                  <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="heart-icon-crack"
                  />
                )}
              </button>
            </div>
            <div className="liked-by">
              {props.item.likes.length !== 0 && (
                <div>
                  <span>
                    {t("i-liked-by")} <Link to="/">{likes[0]}</Link>
                  </span>
                </div>
              )}
            </div>

            <span
              className="btn-liked-usernames"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              {likes.length > 1 && (
                <span className="underline">
                  {" "}
                  {t("i-and-others")} {likes.length - 1} {t("i-users")}
                </span>
              )}
            </span>

            <Modal title="Likes">
              <ul className="list-group">
                {likes.map((username, idx) => {
                  return (
                    <li
                      className="list-group-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      key={idx}
                    >
                      <Link to={`/user/${username}`}>{username}</Link>
                    </li>
                  );
                })}
              </ul>
            </Modal>
          </div>

          {!loading ? (
            <Loader />
          ) : (
            <div>
              <div className="form-item">
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control input-inline"
                    type="text"
                    placeholder={t("i-type-comment")}
                    onChange={(e) => {
                      setCommentInput(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-primary btn-inline"
                    onClick={sendComment}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="form-item">
            <br />
            {props.item.comments.length !== 0 ? (
              <p className="dt">{t("i-comments")}</p>
            ) : (
              <p className="dt">{t("i-no-comments")}.</p>
            )}
            <ul className="list-group">
              {props.item.comments.map((comment) => {
                return (
                  <li className="list-group-item" key={comment.commentID}>
                    <div className="comment">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="p-2 badge bg-primary text-wrap"
                        />
                        <Link to={`/user/${comment.username}`} className="p-2">
                          @{comment.username}
                        </Link>
                        <span className="ms-auto p-2">
                          {getDate(comment.date)}
                        </span>
                      </div>
                      <p className="p-2">{comment.comment}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </BaseCard>
    </>
  );
}
