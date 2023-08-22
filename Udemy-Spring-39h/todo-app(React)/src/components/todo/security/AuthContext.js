import { createContext, useContext, useState } from "react";

//1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false)


    function login(username, password){
        if(username==="kyoungYeob" && password === "1234"){
            setAuthenticated(true)
            return true                
        }else{
            setAuthenticated(false)
            return false;    
        }  
    }

    function logout(){
        setAuthenticated(false)
    }




    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

    //3: Put some state in the context

    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

} 