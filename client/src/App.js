import './App.css';
import ChatPage from './pages/ChatPage';
import {BrowserRouter, Router , Route, Routes } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              <Route exact path = '/' element = {<WelcomePage />}/>
              <Route path = '/chat' element ={<ChatPage />}/>
              <Route path = '/register' element  = {<RegisterPage />} /> 
              <Route path = '/login' element = {<LoginPage />} /> 
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
