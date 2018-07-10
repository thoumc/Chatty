import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let messages = [
{ id: 1,
  username: "Bob",
  content: "Has anyone seen my marbles?",
},
{ id: 2,
  username: "Anonymous",
  content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
}
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages,
      currentUser: {name: "Bob"}
    }
    this.addMessage = this.addMessage.bind(this);
  }
  generateRandomString() {
    var randomString = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      randomString += possible.charAt(Math.floor(Math.random() * possible.length));

    return randomString;
  }


  addMessage(username, content){
    const newMessage = {
      id: this.generateRandomString(),
      username: username,
      content: content
    }

    const oldMessages = this.state.messages
    const newMessagesArray = [...oldMessages, newMessage];
    this.setState({ messages: newMessagesArray})

  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
  }

  render() {

    return (
      <div>
      <MessageList  messages={this.state.messages} />
      <ChatBar addMessage= {this.addMessage} currentUser={this.state.currentUser.name}/>
      </div>
      );
  }
}
export default App;
