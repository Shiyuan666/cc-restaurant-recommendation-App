import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import Panel from './component/Restarant_card/Panel'
import store from './stores'
import Navbar from './component/Navbar/Navbar'

function App() {
  return (        
    <Provider store={store}>    
      <Navbar/>
      <Panel></Panel>
    </Provider>
  );
}

export default App;
