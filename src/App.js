import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { nanoid } from "nanoid";
import Slider from "./Slider";
import { Context } from "./ContextProvider";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import { Switch, Route, Link } from "react-router-dom";
import Album from "./Album";


function App() {
  const { image, setImage } = useContext(Context);
  const [hasPhoto, setHasPhoto] = useState(false);

  let today = new Date();
  let dateFormatted = today.toLocaleDateString();
  let timeFormatted = today.toLocaleTimeString();

  const fullDate = `${dateFormatted} ${timeFormatted}`;

  const [cameraDisabled, setCameraDisabled] = useState();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    console.log(cameraDisabled);
  }, [cameraDisabled]);

  //9306b1097dea4fd19fb3aea3de129a98

  function showCamera() {
    if (navigator.mediaDevices) {
      setCameraDisabled(false);

      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 1920,
            height: 1080,
          },
        })
        .then((stream) => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCameraDisabled(true);
    }
  }

  function getLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }

  function takePhoto() {
    const width = 550;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let context = photo.getContext("2d");
    let xiar = context.drawImage(video, 0, 0, width, height);

    let data = photo.toDataURL("image/png");

    const newData = [
      ...image,
      {
        original: data,
        dateTaken: fullDate,
        city: location[0],
        country: location[1],
        id: nanoid(),
      },
    ];
    setImage(newData);

    setHasPhoto(true);
  }

  async function fetchGeo() {
    const locFetch = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${lng}&localityLanguage=en`
    );
    const response = await locFetch.json();

    if (response) {
      setLocation([response.city, response.countryName]);
    }
  }

  function closePhoto() {
    let photo = photoRef.current;
    let context = photo.getContext("2d");

    context.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  }

  useEffect(() => {
    showCamera();

    getLocation();
    if (navigator.geolocation) {
      fetchGeo();
    }
    // lägg till geolocation grejen fr att få data att sätta på bilder
  }, [videoRef]);

  useEffect(() => {
    showCamera()
  }, [])
  // useEffect(() => {

  //   console.log(location)
  // }, [location])

  return (
    <Switch>

      <Route path="/album">
      <Album/>
      </Route>

      
    <div className="App">
      <div className="h1div">
        <h1
          style={{ textAlign: "center", marginBottom: "1em", color: "white" }}
        >
          SelfieBlam!
        </h1>
      </div>
      <div className="containercam">
        <div className="camera">
          <video ref={videoRef}></video>
          <button onClick={takePhoto} disabled={cameraDisabled}>
            {cameraDisabled ? "Enable your camera" : "Take photo!"}
          </button>
        </div>
      </div>

      <div
        className="photocontainer"
        style={{ display: hasPhoto ? "block" : "none" }}
      >
        <div className={hasPhoto ? "hasPhoto" : ""}>
          <canvas ref={photoRef}></canvas>
          <button onClick={closePhoto}>Close Preview</button>
        </div>
      </div>
      
      <div className="albumlogo">
        <Link to="/album">
          <PhotoAlbumIcon style={{ color: "#844fff", fontSize: "100" }} />
          <p style={{ marginTop: "0", paddingTop: "0" }}>Album</p>
        </Link>
      </div>
    </div>
    </Switch>
  );
}

export default App;
