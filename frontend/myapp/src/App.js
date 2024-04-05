// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Registration from './registerform';
// import Login from './loginform';
// import Booktable from './bookfetch';
// import NavigationBar from './Navigation';

// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//     <div>
//       <NavigationBar />
//     <BrowserRouter>
//       <Routes>
        
        
//         <Route exact path="/register" element={<Registration />} />
//         <Route exact path="/login" element={<Login />} />
//         <Route exact path="/bookget" element = {<Booktable/>} />
//       </Routes>
//     </BrowserRouter>
//       {/* <Registration/> */}
//       {/* <Login /> */}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './Navigation';
import Registration from './registerform';
import Login from './loginform';
import Booktable from './bookfetch';
import MyFormComponent from './registerform';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/register" element={<MyFormComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookget" element={<Booktable />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
