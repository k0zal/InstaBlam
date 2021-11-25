import React, {useContext} from 'react'
import Slider from "./Slider"
import {Context} from "../ContextProvider"
import {Link} from "react-router-dom"
import "../styles/Slider.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Album() {

    const {image} = useContext(Context)
    return (
        <div className="albumcontainer">
            <Link to="/"><ArrowBackIcon style={{color:"inherit", fontSize:"60px"}}/></Link>
            {image && <Slider />}
            
        </div>
    )
}

export default Album
