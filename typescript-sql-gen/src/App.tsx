import MessagesDisplay from "./components/MessagesDisplay"
import CodeDisplay from "./components/CodeDisplay"
import { useState } from "react"

const URL_BACKEND_COMPLETIONS = "http://localhost:8000/completions"

interface ChatData {
  role: string,
  content: string
}

const App = () => {
  const [value, setValue] = useState<string>("")
  const [chat, setChat] = useState<ChatData[]>([])

  const getQuery = async () => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      }
      const response = await fetch(URL_BACKEND_COMPLETIONS, options)
      const data: ChatData = await response.json()
      console.log(data)
      const userMessage = {
        role: "user",
        content: value
      }
      setChat(oldChat => [...oldChat, data, userMessage])
    } catch (error) {
      console.error(error)
    }
  }

  const clearChat = () => {
    setValue("")
    setChat([])
  }

  const filterUserMessages = chat.filter(message => message.role === "user")
  const lastestCode = chat.filter(message => message.role === "assistant").pop()

  return (
    <div className="app">
      <MessagesDisplay userMessages={filterUserMessages} />
      <input value={value} onChange={e => setValue(e.target.value)} />
      <CodeDisplay text={lastestCode?.content || ""} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>Get Query</button>
        <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  );
}

export default App;
