import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-8 text-2xl font-bold text-primary">Mini ERP + CRM Portal</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
