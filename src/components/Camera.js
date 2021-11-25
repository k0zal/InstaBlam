import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/App.css";
import { Context } from "../ContextProvider";
import { nanoid } from "nanoid";
import {Link} from "react-router-dom"
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";


function Camera() {
  const { image, setImage,} = useContext(Context);
  const [cameraDisabled, setCameraDisabled] = useState(true);
  const [status, setStatus] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [location, setLocation] = useState(null);
  const [hovered, setHovered] = useState()
  const [countdown, setCountdown] = useState(false)
  const [time, setTime] = useState(0)

  let today = new Date();
  let dateFormatted = today.toLocaleDateString();
  let timeFormatted = today.toLocaleTimeString();

  const fullDate = `${dateFormatted} ${timeFormatted}`;



 

  function takePhoto() {
    const width = 550;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);

    let data = photo.toDataURL("image/jpeg", 0.7);

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
    localStorage.setItem("images", JSON.stringify(newData))
    setHasPhoto(true);
  }
 
 
function delayedPhoto(){
    setCountdown(true)
    setTime(3)

    setTimeout(() => {
        takePhoto()
    }, 3000);
}
      
useEffect(() => {
    if(time > 0){
        setTimeout(() => {
            console.log("tid kvar: ", time)
            setTime(prevTime => prevTime -1)
        }, 1000);
    }

    if(time === 0 && setCountdown){
        
        setCountdown(false)
    }

}, [time, setCountdown])


  
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
          console.log(status)
        }
      );
    }
  }

  function showCamera() {
    if (navigator.mediaDevices) {
      

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
          setCameraDisabled(false)
        })
        .catch((err) => {
          console.log(err);
          
        });
        
    }
    else{setCameraDisabled(false)}
  }


  useEffect(() => {
    console.log("just nu kameran är", cameraDisabled)
  }, [cameraDisabled])

  function closePhoto() {
    let photo = photoRef.current;
    let context = photo.getContext("2d");

    context.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
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

  useEffect(() => {
      showCamera();
    getLocation();
    if (navigator.geolocation) {
      fetchGeo();
    }
    // add geolocation to get lat and long metadata
  }, [videoRef]);



  return (
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
          {countdown ? null
          
: <button onClick={takePhoto} disabled={cameraDisabled}>
{cameraDisabled ? "Enable your camera" : "Take photo!"}
</button> }
          {!cameraDisabled ?
          <button className={time > 0 ? "blink" : null} onClick={delayedPhoto} disabled={cameraDisabled}>
            {time <= 0 ? "Start Timer!" : time }
          </button>
                    : null }
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
        <Link to="/album" style={{textDecoration: "none"}}>
          <PhotoAlbumIcon onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ color: hovered ? "#ff4f84" : "#844fff", fontSize: "80", transition: "0.4s"}} />
          <p style={{ marginTop: "0", paddingTop: "0", fontSize:"25px" }}>Album</p>
        </Link>
      </div>
    </div>
  );
}


export default Camera;
