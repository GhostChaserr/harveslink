import { BrowserRouter, Route, Routes } from 'react-router';
import { SignIn } from './screens/signin';
import { SignUp } from './screens/signup';
import { Home } from './screens/home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
