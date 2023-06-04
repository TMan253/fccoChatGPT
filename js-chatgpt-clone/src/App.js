import './App.css';
import { useState, useEffect} from 'react'

const submitButton = document.querySelector("#submit")
const inputElement = document.querySelector("input")
const outputElement = document.querySelector("#output")
const historyElement = document.querySelector(".history")
const buttonElement = document.querySelector("button")


const App = () => {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setMessage(null)
    setValue("")
    setCurrentTitle(uniqueTitle)
  }

  const BACKEND_URL = "http://localhost:8000/completions"
  const getMessages = async () => {
    console.log("clicked")
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: value,
      })
    }
    try {
      const response = await fetch(BACKEND_URL, options)
      const data = await response.json()
      console.log(data)
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats,
          {
            title: currentTitle,
            role: "user",
            content: value          
          }, {
            title: currentTitle,
            role: message.role,
            content: message.content          
          }
        ]
      ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  const currentChat = previousChats.filter(
    previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles)
  
  return (
    <div className="App">
      <section className="side-bar">
          <button onClick={createNewChat}>+ New chat</button>
          <ul className="history">
            {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
          </ul>
          <nav>
              <p>Made by TMan253</p>
          </nav>
      </section>
      <section className="main">
          {!currentTitle && <h1>ReactGPT</h1>}
          <ul className="feed">
            {currentChat?.map((chatMessage, index) => <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>)}
          </ul>
          <div className="bottom-section">
              <div className="input-container">
                  <input value={value}
                    onChange={(e) => setValue(e.target.value)}/>
                  <div id="submit" onClick={getMessages}>»</div>
              </div>
          </div>
          <p className="info">ReactGPT 2023-06-01 version.</p>
      </section>
    </div>
  );
}


export default App;
