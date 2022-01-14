import React,{useEffect,useState} from 'react';
import {AxiosInstance} from "../src/config";
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import Comment from "./component/Comment"
import {RiMapPinFill} from 'react-icons/ri';
import AddComment from './component/AddComment';
import Registrate from './component/Registrate';
import Login from './component/Login';



function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46.8625,
    longitude: 103.8467,
    zoom: 4
  });
  const myLocalStorage = window.localStorage;
  const [currentUser,setCurrentUser] = useState(myLocalStorage.getItem('user'))
  const [currentPlace,setCurrentPlace] = useState(null)
  const [newPlace,setNewPlace] = useState(null)
  const [showRegistrate,setShowRegistrate] = useState(false)
  const [showLogin,setShowLogin] = useState(false)

  const handleToggle =(toggle)=>{
    if(toggle===setShowLogin){
      setShowLogin(true)
      setShowRegistrate(false)
    }
    else{
      setShowLogin(false)
      setShowRegistrate(true)
    }
  }

  const handleLogout = ()=>{
    myLocalStorage.removeItem("user")
    setCurrentUser(null)
  }

  const handleAddClick = (e)=>{
          const [longitude,latitude] = e.lngLat
      setNewPlace({
        lat:latitude,
        long:longitude
      })
  }



  const handleMarkerClick = (id,latitude,longitude)=>{
    setCurrentPlace(id)
    setViewport({...viewport,latitude,longitude})
  }

  const [pins,setPins] = useState([])

  useEffect(()=>{
    const getPins = async ()=>{
      try{
        const res = await AxiosInstance.get("/pins");
        setPins(res.data)
      }
      catch(err){
        console.log(err);
      }
    }
    getPins();
  },[])

  return (
    <div>
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/temujin469/cky8tfm4x78jz14p6sehuikg9"
      mapboxApiAccessToken={process.env.REACT_APP_MAP}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={handleAddClick}
      transitionDuration="500"
      doubleClickZoom={false}
      className='cursor-default'
    >
      {pins.map((pin,index)=>
        <div key={index}>
            <Marker latitude={pin.latitude} longitude={pin.longitude} offsetLeft={-10} offsetTop={-18} className='z-0'>
            <RiMapPinFill className={pin.username === currentUser ?'text-amber-400':'text-blue-500'} style={{fontSize:"20px"}}onClick={()=>handleMarkerClick(pin._id,pin.latitude,pin.longitude)}/>
            </Marker>
        {pin._id === currentPlace && (
            <Popup
            latitude={pin.latitude}
            longitude={pin.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setCurrentPlace(null)}
            anchor="bottom" 
            className='z-10 rounded-lg'
            >
            <Comment pin={pin} currentUser={currentUser}/>
          </Popup>)
        }
        </div>
      )}
      {newPlace && (
            <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="bottom" 
            >
              <AddComment currentUser={currentUser} lat={newPlace.lat} long={newPlace.long} setPins={setPins} pins={pins} setNewPlace={setNewPlace} setShowLogin={setShowLogin}/>
          </Popup>
      )}
      <div className='flex justify-between p-2 text-white'>
        {currentUser ? (
          <div className='gap-3 flex'>
            <button className='px-3 p-2 bg-blue-500 rounded hover:bg-yellow-400' onClick={handleLogout}>Гарах</button>
          </div>
        ) : (
          <div className='flex gap-3'>
            <button className='px-3 p-2 bg-yellow-400 rounded hover:bg-blue-500' onClick={()=>handleToggle(setShowRegistrate)}>Бүртгүүлэх</button>
            <button className='px-3 p-2 bg-yellow-400 rounded hover:bg-blue-500' onClick={()=>handleToggle(setShowLogin)}>Нэвтрэх</button>
          </div>
        )}
      </div>
      {showRegistrate && <Registrate setShowRegistrate={setShowRegistrate} setShowLogin={setShowLogin}/>}
      {showLogin && <Login myLocalStorage={myLocalStorage} setCurrentUser={setCurrentUser} handleToggle={handleToggle}
      setShowLogin={setShowLogin} setShowRegistrate={setShowRegistrate}/>}
    </ReactMapGL>
    </div>
  );
}

export default Map;