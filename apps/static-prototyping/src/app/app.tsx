import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScreenHome from './screens/home';
import ScreenUserHome from './screens/user-home';
import ScreenDesignSystems from './screens/design-systems';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenHome />} />
        <Route path="/u/home" element={<ScreenUserHome />} />
        <Route path="/design-systems" element={<ScreenDesignSystems />} />
      </Routes>
    </Router>
  );
}

export default App;
