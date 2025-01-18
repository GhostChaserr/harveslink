import { BrowserRouter, Route, Routes } from 'react-router';

import { SignInScreen } from './screens/signin';
import { SignUpScreen } from './screens/signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
