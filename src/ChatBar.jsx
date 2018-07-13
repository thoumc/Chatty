import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "" ,
      currentUser: ""
    }
  }

  render() {
    // update intermediate state as user types
    const inputMessage = event => {
      let newMessage = event.target.value;
      this.setState({message: newMessage});
    }

    const inputUser = event => {
      let username = event.target.value;
      this.setState({currentUser: username});
    }

    // update intermediate state to app
    const messageSubmit = event => {
      if (event.key === 'Enter'){
        this.props.addMessage(this.state.currentUser, this.state.message);
        event.target.value = "";
      }
    }

    const userSubmit = event => {
      if (event.key === 'Enter'){
        this.props.addUsername(this.state.currentUser);
      }
    }


    return (
      <footer  className="chatbar">
        <input onChange = {inputUser} onKeyPress={userSubmit} name= "username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue= {this.props.currentUser}/>
        <input onChange = {inputMessage} onKeyPress={messageSubmit} name= "newMessage" className="chatbar-message" placeholder="Type a message and hit ENTER"  />
      </footer>
    );
  }
}

export default ChatBar;