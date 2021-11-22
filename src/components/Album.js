import React, {useContext} from 'react'
import Slider from "./Slider"
import {Context} from "../ContextProvider"
import {Link} from "react-router-dom"
import "../styles/Slider.css"

function Album() {

    const {image} = useContext(Context)
    return (
        <div className="albumcontainer">
            <Link to="/">Home</Link>
            {image && <Slider />}
            <h1>lak horunge</h1>
        </div>
    )
}

export default Album
