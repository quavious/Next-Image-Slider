import React, {useState, useEffect, Fragment} from 'react';
import axios from "axios";
import styles from '../../styles/Slider.module.css';

export default function Search() {
  const [album, setAlbum] = useState([]);
  const [ready, isReady] = useState(false);
  const [index, setIndex] = useState(0)
  const [second, setSecond] = useState(5)
  const [text, setText] = useState("")

  useEffect(() => {
    console.log("fileReader is loaded");
    isReady(true)
  }, []);

  const handleSecond = (e) => {
    e.preventDefault()
    if (second === e.target.value) {
      return
    }
    else {
      setSecond(e.target.value)
    }
  }

  const albumInsert = async (e) => {
    e.preventDefault();
    const images = []
    try {
      const resp = await axios.get(`/api/unsplash/${text}`)
      const data = await resp.data.response
      images.push(...await data)
      setAlbum(images)
    } catch(err) {
      console.error(err)
    }
  };

  
  const albumRemove = (e) => {
    const obj = e.target.id;
    const index = parseInt(obj.replace("image", ""), 10);
    const newAlbum = album.filter((_, idx) => idx !== index);
    setAlbum(newAlbum);
  };
  
  useEffect(() => {
    const carousel = setInterval(() => {
      if(index < album.length - 1) {
        setIndex(index + 1)
      } else {
        setIndex(0)
      }
    }, 1000 * second)
    return () => clearInterval(carousel)
  }, [album, index, second])

  const handleChange = (e) => {
    e.preventDefault()
    const {value} = e.target;
    setText(value)
  }

  return (
    <div className={styles["App"]}>
      <h2>Choose The Images and Appreciate</h2>
      <h2>{album.length}</h2>
      <span>{!text ? "No Value" : `The search term ${text} is detected`}</span>
      <div className={styles["App-Carousel"]}>
        {album.length > 0 ? album.map((el, idx) => {
          return (
              idx === index ? (
                  // src={el} alt={`image_${idx}`}
                  <div className={styles["App-Images"]} key={idx} style={{backgroundImage: `url(${el})`}} onClick={albumRemove}></div>
              ) : 
              <Fragment key={idx}></Fragment>
          )
        }) : <h2>No Images</h2>}
      <br />
      </div>
      {!ready ? 
        <p>The fileReader is being loaded...</p> : 
        <div className={styles["App-Input"]}>
          <input className="btn btn-sm btn-dark" type="text" onChange={handleChange} value={text}/>
          <button className="btn btn-sm btn-primary" onClick={albumInsert}>Search</button>
          <label htmlFor="interval" className="text-light my-auto mx-2 bg-dark" id={styles["time-interval"]}>Time Interval</label>
          <input id="interval" className="btn btn-sm btn-dark" style={{width: 60}} type="number" value={second} max="20" onChange={handleSecond} />
        </div>
      }
      <div className={styles["App-Image-Grid"]}>
        {album.length === 0 ? <></> : 
          album.map((el, itr) => 
            <img className={styles["App-Image-List"]} alt={`image_${itr}`} id={`image${itr}`} key={itr} src={el} onClick={albumRemove}/>  
          )
        }
      </div>
    </div>
  );
}

