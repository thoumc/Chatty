import React, {Component} from 'react';


class Message extends Component {

  render() {
    const isMessage = this.props.type === 'postMessage'
    console.log("isMessage true/false", isMessage)



    return (
      <div>
      {isMessage? (<div className="message">
        <span  name="messageUsername" className="message-username">{this.props.username}</span>
        <span name="messageContent" className="message-content">{this.props.content}</span>
      </div>
      ):(
        <span className="notification-content">{this.props.content}</span>
      )}
      </div>
      )
    }
  }
  export default Message;