import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoading] = useState(true);
  const [searchTerm,setSearchTerm] = useState('');
  const [cocktails,setCocktails] = useState([]);

  //Used to fetch the data from TheCocktailDB API 
  const fetchDrinks = useCallback(async() =>{
    setLoading(true);
    try {
      const resp = await fetch(`${url}${searchTerm}`);
      const data = await resp.json();
      const {drinks} = data;
      if(drinks){
        //Used to choose certain properties (id,name,image,info,glass) that will be used and discard the rest
        const newCocktails = drinks.map((drink)=>{
          const {idDrink,strDrink,strDrinkThumb,strAlchoholic,strGlass} = drink;
          return {id:idDrink,name:strDrink,image:strDrinkThumb,info:strAlchoholic,glass:strGlass}
        })
        setCocktails(newCocktails);
      }
      else{
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },[searchTerm])

  useEffect(()=>{
    fetchDrinks();
  },[searchTerm,fetchDrinks])

  return <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm,
  }}>
    {children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
