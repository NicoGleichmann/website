import { Routes, Route } from 'react-router-dom';
import HomePage from './main.tsx';
//import Home from '../portfolio-site/src/Home.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/*<Route path="/portfolio" element={<Home />} />*/}
    </Routes>
  );
};

export default App;
