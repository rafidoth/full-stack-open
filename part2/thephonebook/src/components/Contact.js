import pbservice from "../services/pbservice";

function Contact({contact,id,handleDelete}){
    
    return(<>
      <li>{contact.name}   {contact.number} <button id ={id} onClick={handleDelete}>delete</button></li> 
    </>)
  }


  export default Contact;