import React, { useState, useEffect } from "react";
const Context = React.createContext();

function ContextProvider({children}) {

    const [image, setImage] = useState([
        
      ])

      function removeImg(inputid){
          const removedItem = image.filter(data => {
              return data.id !== inputid
              
          })
          setImage(removedItem)
      }


    return (
        <Context.Provider value={{image , setImage, removeImg}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
