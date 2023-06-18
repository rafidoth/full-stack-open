import { useState,  useEffect } from 'react'
import axios  from 'axios'
const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

  useEffect(()=>{
    const fetchData  = async () =>{
        const response = await axios.get("http://localhost:3001/persons");
        setPersons(response.data);
    }
    fetchData();
  },[])

  const handleSubmit = e=>{
    e.preventDefault();
    const names = persons.map(person=>person.name)
    const flagName = names.indexOf(newName)
    const flagNumber = names.indexOf(newName)
    if(newName){
      if(flagName>-1 && flagNumber>-1){
        alert(`${newName} or ${newNumber} is already added to the phonebook`);
      }
      else{
        setPersons([...persons, {name : newName, number: newNumber}])
        
      }
    }
    setNewName('')
    setNewNumber("")
  }
  const contactList = persons.map((person)=>{
    return <Contact key={person.id} contact={person} />
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Search persons = {persons}/>



      <h2>add a new contact</h2>
      <AddNew 
        name = {newName}
        number={newNumber}
        nameHandler= {e => setNewName(e.target.value)}
        numberHandler={e => setNewNumber(e.target.value)}
        handleSubmit={handleSubmit}
      />
      


      <h2>Numbers</h2>
      {contactList}
    </div>
  )
}

function AddNew ({nameHandler,numberHandler,handleSubmit,name,number }){

  return(<>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={name} onChange = {nameHandler } />
        </div>
        <div>
          number: <input value = {number} onChange = {numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </>)
}


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

function Contact({contact}){
  return(<>
    <li>{contact.name}   {contact.number}</li>
  </>)
}
export default App