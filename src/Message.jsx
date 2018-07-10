import React, {Component} from 'react';


class Message extends Component {

  render() {
    return (
      <div className="message">
          <span name="messageUsername" className="message-username">{this.props.username}</span>
          <span name="messageContent" className="message-content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;