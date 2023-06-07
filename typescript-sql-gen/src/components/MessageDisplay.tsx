interface UserMessage {
    role: string,
    content: string
}

interface MessagesDisplayProps {
    message: UserMessage
}
  
const MessageDisplay = ({message}: MessagesDisplayProps) => {
    return (
      <div className="message-display">
        <p id="icon">X</p>
        <p><strong>{message.role}:</strong></p>
        <p>{message.content}</p>
      </div>
    );
}
  
export default MessageDisplay;
