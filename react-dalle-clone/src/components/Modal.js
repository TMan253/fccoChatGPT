import { useState, useRef } from "react"

const Modal = ({setModalOpen,
                setSelectedImage,
                selectedImage,
                generateVariations}) => {
    const [error, setError] = useState(null)
    const ref = useRef(null)

    const closeModal = () => {
        setModalOpen(false)
        setSelectedImage(null)
    }

    const checkSize = () => {
        const w = ref.current.width
        const h = ref.current.height
        if (w == 256 && h == 256 ||
            w == 512 && h == 512 ||
            w == 1024 && h == 1024) {
            generateVariations()
        } else {
            setError("Error! Image must be 256, 512, or 1024 square pixels.")
        }
    }

    return (
        <div className="modal">
            <div onClick={closeModal}>X</div>
            <div className="img-container">
                {selectedImage && <img
                  ref={ref}
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected item" />}
            </div>
            <p>{error || "* Image must be 256, 512, or 1024 pixels square."}</p>
            {!error && <button onClick={checkSize}>Generate</button>}
            {error && <button 
              onClick={closeModal}>Close this and try again</button>}
        </div>
    )
}

export default Modal
