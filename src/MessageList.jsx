import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
     <main className="postMessages">
      {this.props.messages.map(mes => (
   <Message key = {mes.id} content={mes.content} username={mes.username}  name="messageContent" className="message-content"/>
  ))}
     </main>
     );
  }
}
export default MessageList;