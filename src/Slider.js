import React, {useContext, useState} from 'react'
import "./Slider.css"
import {Context} from "./ContextProvider"


function Slider() {


    const {image, removeImg} = useContext(Context)
    return (
        <div className="container-slider">
            {image.map((data,i) => {
                return(
                    <div key={data.id} className="slide">
                        <img src={data.original} />
                        {console.log(image)}
                        {
                            navigator.geolocation ? 
                        <p>Taken at : {data.city}, {data.country} {data.dateTaken}</p>
            : <p>Location not available, turn on geolocation</p>}
                        <div className="buttonsdiv">
                            
                        <button className="slidebutt" style={{marginTop:"2px", width: "15%", height: "40px", marginRight:"0.2em"}} onClick={() => removeImg(data.id)}>X</button>
                        <button className="slidebutt" style={{marginTop:"2px", height: "40px"}} >Save Image</button>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default Slider
