import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import AddTask from './Screens/AddTask';
import Home from './Screens/Home';
import 'antd/dist/antd.css';
import EditTask from './Screens/EditTask';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/edittask/:id" element={<EditTask />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
