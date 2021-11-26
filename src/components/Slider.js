import React, {useContext} from 'react'
import "../styles/Slider.css"
import {Context} from "../ContextProvider"





function Slider() {


    const {image, removeImg, dloadImage} = useContext(Context)

 

    return (
        <div className="container-slider">
            {image.map((data,i) => {
                return(
                    <div key={data.id} className="slide">
                        <img src={data.original} alt={`Number ${data.id}`}/>
                       
                            
                        <p>Taken at : {data.city}, {data.country} {data.dateTaken}</p>
           
                        <div className="buttonsdiv">
                            
                        <button className="slidebutt" style={{marginTop:"2px", width: "15%", height: "40px", marginRight:"0.2em"}} onClick={() => removeImg(data.id)}>X</button>
                        <button className="slidebutt" onClick={() => dloadImage(data.original, i)} style={{marginTop:"2px", height: "40px"}} >Save Image</button>
                        </div>
                        
                    </div>
                )
            })}


        </div>
    )
}

export default Slider
