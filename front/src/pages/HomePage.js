// import { useState } from "react";

export default function HomePage() {
  // const [data, setData] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/get-images")
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       alert("Cannot get images");
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div>
      <h1>Welcome, {currentUser.name}</h1>
      <div>
        {/* {data.map((singleData) => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(singleData.image.data.data))
          );
          console.log(base64String);

          return (
            <img
              key={singleData._id}
              src={`data:image/png;base64,${base64String}`}
              width="300"
              alt=""
            />
          );
        })} */}
        {/* {data.map((singleImage) => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(singleImage.image.data.data))
          );
          return <img key={singleImage._id} src={`data:image/png;base64,${base64String}`} alt=""/>;
        })} */}
      </div>
    </div>
  );
}
