import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuid = require('uuid/v1');
const randomColor = require('randomcolor');


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      currentUser: {
        name: "Anonymous",
        color: null },
      onlineUser: 0,
    }
    this.addMessage = this.addMessage.bind(this);
    this.addUsername = this.addUsername.bind(this);
  }

  componentDidMount() {

    // connection to webSocket
    this.socket = new WebSocket ("ws://localhost:3001/");

    this.socket.addEventListener ('open', (event) => {
      console.log("App Client connected");
    })

    this.socket.addEventListener ('message', this.receivedMessage);

  }

  // different action depending on type of message from server
  receivedMessage = (event) => {

    const msg = JSON.parse(event.data);
    console.log(msg);
    console.log("the state", this.state);

    switch (msg.type){
      case "userNumber":
        this.setState({onlineUser : msg.userCount});
        break;

      case "colorAssign":
        //this.setState({userColor: msg.userColor});
        this.setState({currentUser: {
          color: randomColor(),
          name: "Anonymous"
        }});

        break;

      default:
      this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.concat(msg)
      }));
    }
  }

  // render user's message input
  addMessage(username, content){
    const newMessage = {
      id: uuid(),
      type: "postMessage",
      username: username,
      content: content,
      color: this.state.currentUser.color
    }

    if (username === "" ){
      newMessage.username = "Anonymous"
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  // update user's username
  addUsername(newName){
    const newUsername = {
      id: uuid(),
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newName}`
    }

    this.socket.send(JSON.stringify(newUsername));

    this.setState({currentUser: {name: newName, color: this.state.currentUser.color} });
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <a className="userNumber">{this.state.onlineUser} user online</a>
        </nav>

        <MessageList  userColor ={this.state.currentUser.color} messages={this.state.messages} />
        <ChatBar addMessage= {this.addMessage} addUsername = {this.addUsername} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
