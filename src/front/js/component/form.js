import React, { Context, useEffect, useState } from "react"

const Form = () => {
    /*const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`${process.env.BACKEND_URL}/users`);
          const data = await response.json();
          setData(data);
        };
    
        fetchData();
      }, []);*/

return (

    <form className="container" style={{ maxWidth:"750px"}}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label"><strong>Email address</strong></label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
            <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  
    )
}
export default Form