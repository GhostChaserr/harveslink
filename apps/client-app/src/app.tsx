import { BrowserRouter, Route, Routes } from 'react-router';

import { SignInScreen } from './screens/signin';
import { SignUpScreen } from './screens/signup';
import { HomeScreen } from './screens/home';
import { Layout } from './components';
import { StoreScreen } from './screens/store';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout>
              <HomeScreen />
            </Layout>
          }
          index
        />
        <Route
          element={
            <Layout>
              <StoreScreen />
            </Layout>
          }
          path='/store'
        />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
