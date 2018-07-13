import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
     <main className="postMessages">
      {this.props.messages.map(mes => (
   <Message userColor= {mes.color} key = {mes.id} type={mes.type} content={mes.content} username={mes.username}  name="messageContent" className="message-content"/>
  ))}
     </main>
     );
  }
}
export default MessageList;