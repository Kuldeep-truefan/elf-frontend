import React from 'react'
import { json } from 'react-router-dom';
import { WebSocket } from 'ws';

const Websoc = () => {

const ws = new WebSocket('ws:http://34.122.118.251:8000/ws/ac/');
// const ws = new WebSocket('ws://127.0.0.1:8000/ws/ac/');


ws.onmessage = (event) => {
  console.log(event.data);
};


ws.send();

ws.close();

  return (
    <div>Websoc</div>
  )
}

export default Websoc