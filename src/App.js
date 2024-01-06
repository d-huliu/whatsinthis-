import {Routes, Route, Outlet} from 'react-router-dom'
import Home from '../src/pages/Home';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import NutritionDetail from './pages/NutritionDetail';

function Layout(){
  return (
    <>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </>
  )
}
function App() {
  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='search' element={<NutritionDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;