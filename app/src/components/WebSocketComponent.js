import { Component } from 'react';
import socketIOClient from 'socket.io-client';

class WebSocketComponent extends Component {
    constructor(props) {
        super(props);
        console.log('socket connection here');
    }
}

export default WebSocketComponent;
