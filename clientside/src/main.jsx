import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx'
import Create from './Components/Create.jsx';
import Update from './Components/Update.jsx';
import Edit from './Components/Edit.jsx';
import Delete from './Components/Delete.jsx';
import Read from './Components/Read.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/read" element={<Read />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/update:id" element={<Edit />} />
          <Route path="/delete" element={<Delete />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
