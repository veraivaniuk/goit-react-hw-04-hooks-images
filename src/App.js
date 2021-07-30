import { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import pixabayApi from "./services/pixabay-api";
import Modal from "./components/Modal";
import ImageGallery from "./components/ImageGallery";
import Container from "./components/Container";
import Loader from "./components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (inputQuery === '') {
      return
    }
    setImages([]);
    setCurrentPage(1)
    fetchImages();
  }, [inputQuery]);

  const onSearch = (query) => {
    console.log(query);
    if (query === "") {
      const notify = () => toast.warn(`Something went wrong`);
      return notify();
    }
    setInputQuery(query);
    setCurrentPage(1);
    setError(null);
  };

  const fetchImages = () => {
    setIsLoading(true);
    
      pixabayApi
      .fetchImages(inputQuery, currentPage)
      .then((data) => {
        if (data.length === 0) {
          const notify = () => toast.warn(`Something went wrong`);
          return notify();
        }
        setImages((prevState) => [...prevState, ...data] );
        setCurrentPage((prevState) => prevState += 1);
        if (currentPage >= 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        const notify = () => toast.warn(`Something went wrong`);
        return notify();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onModal = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState)
  }
  


    return (
      <Container>
        <Searchbar onSubmit={onSearch} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onClick={onModal} />
        {images.length > 0 && (
          <button className="Button" type="button" onClick={fetchImages}>
            Load more
          </button>
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
}
