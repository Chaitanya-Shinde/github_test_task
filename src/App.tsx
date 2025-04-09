// pages/Home.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import User from './pages/User';


const App = () => {
  return (
    <>
       <Routes>
          {/* Redirect / to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path='/user/:username' element={<User/>}></Route>
          <Route path="*" element={<h1>404 - Not Found</h1>} />
       </Routes>
    </>
 );
};

export default App;