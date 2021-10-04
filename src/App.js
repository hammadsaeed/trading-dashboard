import React, {useState, useEffect} from 'react';
import './App.css';
import Spot from './Components/Spot/index';
import io from 'socket.io-client';
import config from './Config';

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(config.API.endpoint);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      {socket && (
        <Spot socket={socket} />
      )}
    </div>
  );
}

export default App;
