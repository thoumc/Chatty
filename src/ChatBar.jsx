import React, {Component} from 'react';


class ChatBar extends Component {

  render() {
  const onKeyPress = event => {
    if (event.key === 'Enter'){
      console.log("this is the target", event.target.value)
      const username = this.props.currentUser;
      let newMessage = event.target.value;
      this.props.addMessage(username, newMessage);
       // empty the form
      newMessage = "";
    }
  }
    return (
      <footer  className="chatbar">
      <input name= "username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue= {this.props.currentUser}/>
      <input onKeyPress = {onKeyPress}  name= "newMessage" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
  }
}
export default ChatBar;