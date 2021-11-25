
import React, { useState, useEffect } from "react";
import FileSaver from 'file-saver';
const Context = React.createContext();






function ContextProvider({children}) {
    
    const [image, setImage] = useState([
        
    ])

    

    function checkCookie(){
        const cookieExists = localStorage.getItem("images")
        
        if(!cookieExists){
            localStorage.setItem("images", image)
        }
        else{
            const cookied = JSON.parse(localStorage.getItem("images"))
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
          localStorage.setItem("images", JSON.stringify(removedItem))
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
