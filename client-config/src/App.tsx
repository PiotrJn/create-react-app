import React, { useState } from 'react';
import Test from './Test';

const App: React.FC = () => {
    const [text, setText] = useState('asd');

    return <Test text={text} setText={setText} />;
};

export default App;
