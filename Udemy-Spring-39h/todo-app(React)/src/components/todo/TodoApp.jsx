import {useState} from 'react'
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

import './TodoApp.css'

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
    return(children)

    return <Navigate to="/" />
}

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}></Route>
                        <Route path='/login' element={<LoginComponent/>}></Route>
                        
                        <Route path='/welcome/:username' element={
                        <AuthenticatedRoute>   
                            <WelcomeComponent/> 
                        </AuthenticatedRoute>                        
                        }/>

                        <Route path='/todos' element={
                        <AuthenticatedRoute>
                            <ListTodosComponent/>
                        </AuthenticatedRoute>    

                        }></Route>

                        <Route path='/logout' element={
                        <AuthenticatedRoute>
                            <LogoutComponent/>
                        </AuthenticatedRoute>    
                        }></Route>

                        <Route path='*' element={<ErrorComponent/>}></Route>
                    </Routes>
                    <FooterComponent />
                </BrowserRouter> 
            </AuthProvider>    
        </div>
    )
}




