import React, { useState } from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {

  const [state,setState]=useState('Login');
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login =async()=>{
    
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch ('http://localhost:5000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',

      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }


  }

  const signup=async()=>{
    console.log("Signup Function Executed",formData);
    let responseData;
    await fetch ('http://localhost:5000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',

      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }
  
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>} 
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"? <p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState('Login')}}>Login here</span></p>
        : <p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span ></p>}
       
       
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing,i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
export default LoginSignup


/*1. IP Address
Definition: An IP (Internet Protocol) address is a unique identifier assigned to each device connected to a network that uses the Internet Protocol for communication. It identifies the device's location on a network.

Format:

IPv4: A 32-bit address usually written in dotted decimal format (e.g., 192.168.1.1).
IPv6: A 128-bit address written in hexadecimal format (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334).
Purpose: Identifies the device or host on a network. It's like a home address for a computer, telling other devices where to send data.

2. Port Number
Definition: A port number is a numerical identifier used to route network traffic to specific processes or services on a device. It works in conjunction with an IP address.

Range:

Well-known ports: 0–1023 (e.g., HTTP on port 80, HTTPS on port 443).
Registered ports: 1024–49151 (used by software applications).
Dynamic or private ports: 49152–65535 (used for temporary or ephemeral purposes).
Purpose: Helps direct incoming and outgoing network traffic to the correct application or service on a device. If an IP address is the home address, the port number is like an apartment number within that home.

3. URL (Uniform Resource Locator)
Definition: A URL is a human-readable address used to access resources on the web. It combines a protocol, a domain name (or IP address), and optionally, a port number and a path.

Format:

Protocol: Specifies the protocol to use (e.g., http, https, ftp).
Domain Name: Translates to an IP address (e.g., www.example.com).
Port Number (optional): Specifies a port if different from the default (e.g., :8080).
Path: Points to a specific resource or page (e.g., /about).
Example URL: https://www.example.com:8080/about

Purpose: Provides a way for users and applications to access resources on the web by specifying a human-readable address that includes the protocol, domain, port (if needed), and resource path.

How They Work Together
Domain Name Resolution: When you enter a URL like https://www.example.com/about into a web browser:

The domain name (www.example.com) is resolved to an IP address via DNS (Domain Name System).
The browser then knows which IP address to send the request to.
Port Number: If the URL includes a port number (e.g., https://www.example.com:8080), it tells the browser to use that specific port on the server. If no port is specified, the browser uses default ports (80 for HTTP, 443 for HTTPS).

Routing the Request:

The browser sends the request to the resolved IP address on the specified port.
The server uses the port number to route the request to the appropriate service or application.
The server then responds with the requested resource, which the browser displays.
Summary
IP Address: Identifies the device on a network.
Port Number: Identifies the specific application or service on that device.
URL: Provides a human-readable address combining a protocol, domain, optional port, and resource path to access web resources.
These components work together to enable effective and organized network communication, ensuring that data reaches the correct destination and service.*/








/*
An API request is a way for an application (typically the frontend) to request data or perform actions by communicating with a server-side service (typically the backend) using an API (Application Programming Interface). Here’s a more detailed breakdown of what this involves:

What is an API Request?
Definition:

An API request is a message sent from a client application (like a web browser or mobile app) to a server, asking the server to perform an operation or return data.
Components of an API Request:

URL (Uniform Resource Locator): The address of the API endpoint, which specifies where the request is sent. For example, http://localhost:5000/signup.Here 5000 is the port no where backend runs.
HTTP Method: The type of request being made. Common methods include:
GET: Request data from a server.
POST: Send data to a server to create or update a resource.
PUT: Update a resource on the server.
DELETE: Remove a resource from the server.
Headers: Metadata sent with the request, such as content type (Content-Type: application/json), authentication tokens, etc.
Body: The data sent with the request, usually in JSON format, which is relevant for POST and PUT requests.
Purpose:

API requests allow client applications to interact with backend services. For instance, a web app might use API requests to fetch user data, submit a form, or perform other operations that involve server-side processing.*/