
import React, { useState, useEffect } from "react";
import FileSaver from 'file-saver';

const Context = React.createContext();





function ContextProvider({children}) {
    
    const [image, setImage] = useState([
        {
            original: "https://i.pinimg.com/originals/8e/9d/6d/8e9d6de0173ada66349f3cdd85895330.jpg",
        dateTaken: "25/11/2021 16:40:35",
        city: "Seattle",
        country: "USA",
        id: "AeFkehadiyEid_34s"
        },
        {
            original: "https://static.boredpanda.com/blog/wp-content/uploads/2017/01/funny-animal-selfies-80-587e35b2319d6__605.jpg",
            dateTaken: "25/11/2021 11:40:35",
            city: "San Francisco",
            country: "USA",
        id: "32fi5waErlkAe_484s"
        }
    ])

    

    function checkCookie(){
        const cookieExists = localStorage.getItem("images")
        
        if(!cookieExists){
            // localStorage.setItem("images", image)
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
