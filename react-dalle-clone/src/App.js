import { useState } from "react"
import Modal from "./components/Modal"

const BACKEND_URL = "http://localhost:8000/images"
const BACKEND_UPLOAD_URL = "http://localhost:8000/upload"
const BACKEND_VARIATION_URL = "http://localhost:8000/variations"

const App = () => {
  const [images, setImages] = useState(null)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const surpriseOptions = [
    'A blue ostrich eating melon',
    'A matisse shark on the telephone',
    'A pineapple sunbathing on an island'
  ]

  const surpriseMe = async () => {
    setError(null)
    setImages(null)
    const randomValue = Math.floor(
      Math.random() * surpriseOptions.length)
    setValue(surpriseOptions[randomValue])
  }

  const getImages = async () => {
    setImages(null)
    if (value == null || value === "") {
      setError("Error! Please provite a prompt.")
      return
    } else {
      setError(null)
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch(BACKEND_URL, options)
      const data = await response.json()
      console.log(data)
      setImages(data)
    } catch (error) {
      console.error(error)
    }
  }

  const uploadImage = async (e) => {
    const userFile = e.target.files[0]
    console.log(userFile)
    const formData = new FormData()
    formData.append('file', userFile)
    setModalOpen(true)
    setSelectedImage(userFile)
    e.target.value = null

    try {
      const options = {
        method: "POST",
        body: formData
      }
      const response = await fetch(BACKEND_UPLOAD_URL, options)
      const data = await response.json()
      console.log(data)
      //setImages(data)
    } catch (error) {
      console.error(error)
    }
  }

  const generateVariations = async () => {
    setImages(null)
    if (selectedImage === null) {
      setError("Error! Must choose an image.")
      setModalOpen(false);
      return
    }
    try {
      const options = {
        method: "POST"
      }
      const response = await fetch(BACKEND_VARIATION_URL, options)
      const data = await response.json()
      console.log(data)
      setImages(data)
      setError(null)
      setModalOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
    <section className="search-section">
      <p>Start with a detailed description
        <span className="surprise"
          onClick={surpriseMe}>Surprise me</span></p>
      <div className="input-container">
        <input
          placeholder="Impressionist oil painting of a sunflower in a vase"
          value={value==null ? "" : value}
          onChange={e => setValue(e.target.value)} />
        <button onClick={getImages}>Generate</button>
      </div>
      <p className="extra-info">Or,
        <span>
          <label htmlFor="files"> upload an image </label>
          <input id="files" accept="image/*" type="file" hidden
            onChange={uploadImage}/>
        </span>
        to edit
      </p>
      {error && <p>{error}</p>}
      {modalOpen && <div className="overlay">
        <Modal
          setModalOpen={setModalOpen}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          generateVariations={generateVariations} />
      </div>}
    </section>
    <section className="image-section">
      {images?.map((image, _index) => (
        <img key={_index}
             src={image.url}
             alt={"Generated depiction of ${value}"} />
      ))}
    </section>
    </div>
  );
}

export default App;
