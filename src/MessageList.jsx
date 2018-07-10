import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
     <main className="messages">
      {this.props.messages.map(mes => (
   <Message key = {mes.id} content={mes.content} username={mes.username}  name="messageContent" className="message-content"/>
  ))}
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
     </main>
     );
  }
}
export default MessageList;