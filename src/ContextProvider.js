import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import FileSaver, { saveAs } from 'file-saver';
const Context = React.createContext();

const xiar = JSON.parse(Cookies.get("images"))

console.log(xiar)

function ContextProvider({children}) {
    
    const [image, setImage] = useState([
        
    ])

    function checkCookie(){
        const cookieExists = Cookies.get("images")
        if(!cookieExists){
            Cookies.set("images", image)
        }
        else{
            const cookied = JSON.parse(Cookies.get("images"))
            setImage(cookied)
        }
        
    }


    useEffect(() => {
        checkCookie()
        
    }, [])

      function removeImg(inputid){
          const removedItem = image.filter(data => {
              return data.id !== inputid
              
          })
          setImage(removedItem)
      }

      function dloadImage(imgid, name){
          FileSaver.saveAs(imgid, name+".jpg")
      }


    return (
        <Context.Provider value={{image , setImage, removeImg, checkCookie, dloadImage}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
