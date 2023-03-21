import react, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { ParentContext } from './context/parentContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { SuperAdSignup } from './pages/SuperAdSignup';
import { SuperAdlogin } from './components/SuperadLogin/SuperAdlogin';
import { AdDashboard } from './components/AdminDashboard/AdDashboard';
import { Adminsignup } from './components/AdSignup/Adminsignup';
import { Adlogin } from './components/AdLogin/Adlogin';


function App() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "http://localhost:3001/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <div className="App">
      {/* <div>
        <h1>welcome</h1>
        <div className="mt-5">
          <input type="file" accept=".csv, text/csv" onChange={handleFileChange} />
          <div>{file && `${file.name} - ${file.type}`}</div>
          <button onClick={handleUploadClick}>Upload</button>
        </div>
      </div>


      <div>
        <Modal
          open={false}
          onClose={e => { }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ display: 'flex', outline: "0px !important" }}>
            <CircularProgress />
          </Box>
        </Modal>
      </div> */}

      <ParentContext>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/superAdminSignup' element={<SuperAdSignup />} />
            <Route path='/superAdminSignup/superAdlogin' element={<SuperAdlogin />} />
            <Route path='/superadmin/dashboard' element={<AdDashboard />} />
            <Route path='/superadmin/adminsignup' element={<Adminsignup />} />
            <Route path='/superadmin/adminlogin' element={<Adlogin />} />
          </Routes>
        </BrowserRouter>

      </ParentContext>


    </div>
  );
}

export default App;
