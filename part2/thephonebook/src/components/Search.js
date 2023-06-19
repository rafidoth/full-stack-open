import { useState } from "react";
import Contact from "./Contact";
function Search ({persons}){

    const [searched, setSearched] = useState([]);
  
    const handleSearch = (e) =>{
      const searchedValue = e.target.value
      if(searchedValue){
        const matchedItems = persons.filter(item => item.name.toLowerCase().includes(searchedValue.toLowerCase()))
        setSearched(matchedItems)
      }else{
        setSearched([])
      }
    }
  
    const matchedItems = searched.map((contact) =>{
      return <Contact contact={contact} />
    })
  
    return(
      <>
        search contact : <input onChange= {handleSearch}/>
        <br></br>
        search result : 
        {matchedItems}
      </>
    )
  }

  export default Search;