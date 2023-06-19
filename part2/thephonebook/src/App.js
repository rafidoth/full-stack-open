
import { useState,  useEffect } from 'react'
import pbservice from './services/pbservice'
import Search from './components/Search'
import Contact from './components/Contact'
import AddNew from './components/Addnew'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  useEffect(()=>{
    const fetchData  = async () =>{
        const response = await pbservice.getAll();
        setPersons(response.data);
    }
    fetchData();
  },[])



  const handleSubmit = e=>{
    e.preventDefault();
    const names = persons.map(person=>person.name)
    const flagName = names.indexOf(newName)
    const flagNumber = names.indexOf(newNumber)
    if(newName){
      if(flagName>-1 && flagNumber === -1){
        const newContact = {name : newName, number: newNumber}
        const person = persons.filter(p=> p.name === newName)
        const newPersons  = persons.filter((p)=>p.name!==newName)
        const runAsync = async () =>{
          try{
            const response = await pbservice.update(person[0].id,newContact)
            setPersons([...newPersons, response.data])
            setMessage(`Updated ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 4000);
          }catch(err){
            setMessage(`The contact is already removed.}`)
            setTimeout(() => {
              setMessage(null)
            }, 4000);
          }
        }
        if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace it with the new number?`)) {
          runAsync()
        }
      }else if(flagName>-1 && flagNumber > -1){
        alert(`${newName} and ${newNumber} both are already in the phonebook.`);
      }
      else{
        const newContact = {name : newName, number: newNumber}
        const runAsync =  async () =>{
          const response = await pbservice.create(newContact);
          setPersons([...persons, response.data])
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 4000);
        }
        runAsync();
        
      }
    }
    setNewName('')
    setNewNumber("")
  }



  const handleDelete = e =>{
    const id = e.target.id
    const person = persons.filter((person)=> person.id == id)
    const deleteContact = async () =>{
      await pbservice.deleteContact(id);
      const response = await pbservice.getAll()
      setPersons(response.data)
      setMessage(`Deleted ${person[0].name}`)
          setTimeout(() => {
            setMessage(null)
          }, 4000);
    }
    if (window.confirm(`Delete ${person[0].name} ?`)) {
      deleteContact()
    }
  }
  
  const contactList = persons.map((person)=>{
    return (<>
      <Contact handleDelete={handleDelete} key={person.id} id={person.id} contact={person} /> 
      
    </>)
  })



  return (
    <div>
      <h2>Phonebook <Notification message={message} /></h2>
      
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





export default App