import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { useAuth } from './security/AuthContext'


function LoginComponent(){
    const [username,setUsername] = useState('kyoungYeob')
    const [password,setPassword] = useState('')
    const [showErrorMessage,setShowErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth()


    function handleUsernameChange(event){
        setUsername(event.target.value); 
    }

    function handlePasswordChange(event){
        setPassword(event.target.value); 
    }

    function handleSubmit(){
        if(authContext.login(username,password)){
            navigate(`/welcome/${username}`)            
        }else{
            setShowErrorMessage(true)
        }
    }


    return(
        <div className="Login">
            <h1>Time to Login!</h1>
            {showErrorMessage && <div className='errorMessage'>인증 실패, 다시 확인바랍니다.</div> }
            {/* <SuccessMessageComponent />
            <ErrorMessageComponent /> */}
            <div className="LoginForm">
                <div>
                    <label htmlFor="">User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>                    
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>                    
                </div>

                <div>
                    <button type="button" name="login" onClick={handleSubmit}>
                        로그인
                    </button>
                </div>

            </div>

        </div>
    )
}

export default LoginComponent