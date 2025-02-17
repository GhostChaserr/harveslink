import { BrowserRouter, Route, Routes } from 'react-router';

import { SignInScreen } from './screens/signin';
import { SignUpScreen } from './screens/signup';

import { Layout } from './components';
import { StoreScreen } from './screens/store';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout>
              <StoreScreen />
            </Layout>
          }
          index
        />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
