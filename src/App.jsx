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
      currentUser: "Anonymous"
    }
    this.addMessage = this.addMessage.bind(this);
    this.addUsername = this.addUsername.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket ("ws://localhost:3001/");


    this.socket.addEventListener ('open', (event) => {
      console.log("App Client connected")
    })

    this.socket.addEventListener ('message', this.receivedMessage)

  }

  receivedMessage = (event) => {
      //console.log("incoming event:", event)
      const msg = JSON.parse(event.data);
      console.log(msg)
      this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.concat(msg)
      }))
  }


  addMessage(username, content){
    const newMessage = {
      id: uuid(),
      username: username,
      content: content
    }

    if (username === "" ){
      newMessage.username = "Anonymous"
    }
     this.socket.send(JSON.stringify(newMessage));
  }

  addUsername(username){

    this.setState({currentUser: username })

  }


  render() {

    return (
      <div>
      <MessageList  messages={this.state.messages} />
      <ChatBar addMessage= {this.addMessage} addUsername = {this.addUsername} currentUser={this.state.currentUser}/>
      </div>
      );
  }
}
export default App;
