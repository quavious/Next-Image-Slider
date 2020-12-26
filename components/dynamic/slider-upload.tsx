import React, {useState, useEffect, Fragment} from 'react';
import styles from '../../styles/Slider.module.css';

export default function Home() {
  const [album, setAlbum] = useState([]);
  const [ready, isReady] = useState(false);
  const [index, setIndex] = useState(0)
  const [second, setSecond] = useState(5)

  const handleSecond = (e) => {
    e.preventDefault()
    if (second === e.target.value) {
      return
    }
    else {
      setSecond(e.target.value)
    }
  }

  const albumAdd = (data, arr) : Promise<string> => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      try {
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (typeof result === "string") {
            arr.push(result);
            res("Image Pushed")
          }
        };
        
        fileReader.readAsDataURL(data);
      } catch(err) {
        console.log(err)
        rej("Server ERROR")
      }
    })
  }

  useEffect(() => {
    console.log("fileReader is loaded");
    isReady(true)
  }, []);

  const albumInsert = async (e) => {
    e.preventDefault();
    const { files } = e.target;
    const temp = [];
    for(let i = 0; i < files.length; i++) {
      await albumAdd(files[i], temp);
    }
    setAlbum([...album, ...temp])
  };

  
  const albumRemove = (e) => {
    const obj = e.target.alt;
    const index = parseInt(obj.replace("image_", ""), 10);
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
  }, [album, index])

  return (
    <div className={styles["App"]}>
      <h2>Choose The Images and Appreciate</h2>
      <h2>{album.length}</h2>
      <div className={styles["App-Carousel"]}>
        {album.length > 0 ? album.map((el, idx) => {
          return (
              idx === index ? <img className={styles["App-Images"]} alt={`image_${idx}`} key={idx} src={el} onClick={albumRemove}/> : 
              <Fragment key={idx}></Fragment>
          )
        }) : <h2>No Images</h2>}
      <br />
      </div>
      {!ready ? 
        <p>The fileReader is being loaded...</p> : 
        <div className={styles["App-Input"]}>
          <input className="btn btn-sm btn-dark d-flex align-items-center" style={{width: 215}} type="file" accept="image/*" onChange={albumInsert} multiple />
          <label htmlFor="interval" className="text-light my-auto mx-2 bg-dark" id={styles['time-interval']}>Time Interval</label>
          <input id="interval" className="btn btn-sm btn-dark" style={{width: 60}} type="number" value={second} max="20" onChange={handleSecond} />
        </div>
      }
      <div className={styles["App-Image-Grid"]}>
        {album.length === 0 ? <></> : 
          album.map((el, itr) => 
            <img className={styles["App-Image-List"]} alt={`image_${itr}`} key={itr} src={el} onClick={albumRemove}/>  
          )
        }
      </div>
    </div>
  );
}