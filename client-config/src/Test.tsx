import React, { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';

interface Props {
    text: string;
    setText: (value: string) => void;
}

const Test: React.FC<Props> = ({ text, setText }) => {
    const videoOneRef = useRef<HTMLDivElement>(null);
    const videoTwoRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const initiateRef = useRef<HTMLInputElement>(null);
    const peerRef = useRef(
        new SimplePeer({
            initiator: location.hash === '#1',
            trickle: false,
        }),
    );

    useEffect(() => {
        const peer = peerRef.current;

        peer.on('error', (err) => console.log('error', err));

        peer.on('signal', (data) => {
            console.log(JSON.stringify(data));
        });

        peer.on('connect', () => {
            console.log('CONNECT');
            peer.send('whatever' + Math.random());
        });

        peer.on('data', (data) => {
            console.log('data: ' + data);
            const decoder = new TextDecoder('utf-8');
            setText(decoder.decode(data));
        });
    }, []);

    function handleSubmit() {
        peerRef.current.send(inputRef.current.value);
    }

    function handleInitiate() {
        peerRef.current.signal(initiateRef.current.value);
    }

    return (
        <div className="App">
            <div ref={videoOneRef}>{text}</div>
            <div ref={videoTwoRef}></div>
            <input ref={initiateRef} type="text" placeholder="Initiate"></input>
            <button onClick={handleInitiate}>Initiate</button>
            <input ref={inputRef} type="text" placeholder="Input sth"></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Test;
