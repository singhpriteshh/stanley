
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import HomeLayout from './components/home/layout'
import NotFound from './pages/not-found'
import AddData from './pages/home/adddata'
import DisplayData from './pages/home/displayData'
import CheckAuth from './components/common/check-auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import ProductPage from './pages/product/productPage'

function App() {


  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  if (isLoading) return <div>loadingg.....</div>

  return (
    <>

      <Routes>

        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>


        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>

          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />

        </Route>

        <Route path='/productpage' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ProductPage />
          </CheckAuth>
        }>
        </Route>

        <Route path='home' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <HomeLayout />
        </CheckAuth>} >
          <Route path='adddata' element={<AddData />} />
          {/* <Route path='displaydata' element={<DisplayData />} /> */}

        </Route>

        <Route>
          <Route path='displaydata' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <DisplayData />
          </CheckAuth>} />
        </Route>
        
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
