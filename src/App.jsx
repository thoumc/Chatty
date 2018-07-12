import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuid = require('uuid/v1');




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      currentUser: "Anonymous",
      onlineUser: 0
    }
    this.addMessage = this.addMessage.bind(this);
    this.addUsername = this.addUsername.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket ("ws://localhost:3001/");

    this.socket.addEventListener ('open', (event) => {
      console.log("App Client connected")
      this.setState({userNumber: (this.state.userNumber + 1)})
    })

    this.socket.addEventListener ('message', this.receivedMessage)

  }

  receivedMessage = (event) => {
    const msg = JSON.parse(event.data);
    console.log("this message: ", msg)

    switch (msg.type){
      case "userNumber":
        this.setState({onlineUser : msg.userCount})
        break;

      default:
      this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.concat(msg)
      }))
    }

  }


  addMessage(username, content){
    const newMessage = {
      id: uuid(),
      type: "postMessage",
      username: username,
      content: content
    }

    if (username === "" ){
      newMessage.username = "Anonymous"
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  addUsername(newName){
    const newUsername = {
      id: uuid(),
      type: "postNotification",
      content: `${this.state.currentUser} has changed their name to ${newName}`
    }

    this.socket.send(JSON.stringify(newUsername))

    this.setState({currentUser: newName })
  }

  render() {

    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <a className="userNumber">{this.state.onlineUser} user online</a>
      </nav>

      <MessageList  messages={this.state.messages} />
      <ChatBar addMessage= {this.addMessage} addUsername = {this.addUsername} currentUser={this.state.currentUser}/>
      </div>
      );
  }
}
export default App;
