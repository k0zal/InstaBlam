import React, {useContext} from 'react'
import Slider from './Slider'
import {Context} from "./ContextProvider"
import {Link} from "react-router-dom"

function Album() {

    const {image} = useContext(Context)
    return (
        <div>
            <Link to="/">Home</Link>
            {image && <Slider />}
        </div>
    )
}

export default Album
