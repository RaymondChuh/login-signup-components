import React from 'react';
import {EmailUserNameInput} from "./UserNameInput.jsx"


export class HelloWorld extends React.Component{
  render(){
    return <div>
        <h1>Hello, world!</h1>
        <EmailUserNameInput/>
      </div>
  }
};
