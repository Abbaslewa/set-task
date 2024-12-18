import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SaveTask from './pages/SaveTaskPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/save-task/:index" element={<SaveTask />} />
      </Routes>
    </Router>
  );
}

export default App;
