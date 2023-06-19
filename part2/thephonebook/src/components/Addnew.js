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



  export default AddNew; 
