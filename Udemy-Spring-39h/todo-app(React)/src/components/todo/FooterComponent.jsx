import { useContext } from 'react'
import { AuthContext } from './security/AuthContext'

function FooterComponent(){
    const authContext = useContext(AuthContext)
    
    return(
        <footer className="footer">
            <div className="container">
                사이트 발행자: Kim kyoung yeob 
            </div>            
        </footer>
    )
}

export default FooterComponent