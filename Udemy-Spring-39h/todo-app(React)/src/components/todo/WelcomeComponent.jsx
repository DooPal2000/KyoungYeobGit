import {useParams, Link} from 'react-router-dom'

function WelcomeComponent(){
    const {username} = useParams()
    return(
        <div className="Welcome">
            <h1>Welcome {username}'s Page!</h1>
            <div>당신의 to-do 리스트를 관리하세요 <Link to="/todos">Go here</Link></div>            
        </div>
    )
}



export default WelcomeComponent