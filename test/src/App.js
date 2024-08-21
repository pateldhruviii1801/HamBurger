// import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header from './components/header';
import Home1 from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Register from './pages/register';
import Menu from './pages/menu';
import Addmenu from './pages/addmenu';
import Footer from  './components/footer';
import Addcategory from './pages/addcategory';
import Category from './pages/category';
import Cart from './pages/cart';
import Payment from './pages/payment';
import Myorder from './pages/myorders';
import View from './pages/view';
import Count from './pages/count';

function App() {


  return (
  <>

  {/* <Home1/>
  <About/>
  <Contact/>*/}

<Router>
<Header/>
<Routes>
<Route exact path='/' element={<Home1/>} />
<Route exact path='/about' element={<About/>} />
<Route exact path='/con' element={<Contact/>} />
<Route exact path='/login' element={<Login/>} />
<Route exact path='/menu' element={<Menu/>} />
<Route exact path='/register' element={<Register/>} />
<Route exact path='/addmenu' element={<Addmenu/>} />
<Route exact path='/addcategory' element={<Addcategory/>} />
<Route exact path='/category' element={<Category/>} />
<Route exact path='/cart' element={<Cart/>} />
<Route exact path='/payment' element={<Payment/>}/>
<Route exact path='/myorders' element={<Myorder/>}/>
<Route exact path='/view' element={<View/>}/>
<Route exact path='/count' element={<Count/>}/>
</Routes>
<Footer/>
</Router>

       </>
  );
}

export default App;
