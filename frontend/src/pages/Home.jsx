import React from "react";
import { useAuth } from "../providers/auth";
import '../styles/Home.css'

const Home = () => {
    const { auth, token } = useAuth();

    return (
        <>
            <div className="homeContainer">
                <h2>Home</h2>

                <div className='whiteContainer'>
                    <h2>BE UP TO DATE AND TRACK YOUR FAVOURITE TV SHOWS</h2>
                    <div>
                        <p className="simpleTextCenter">This TV Show Tracker is an exam project: the goal is to make possible for registered users to organize and keep track of their TV shows and series in an administrative, easy to use system.</p>
                        <p className="simpleText">What can it do:</p>
                        <ul className="uList">
                            <li>Register and login with third-party accounts - Google  custom openid which is also included in this repository, however not part of the project.</li>
                            <li>Logged in user has a personalized profile page.</li>
                            <li><p>Browsing unlimited number of TV shows for all users.</p></li>
                            <li><p>Getting more details about a show: air date, network, runtime, episode list and more.</p></li>
                            <li><p>If something cannot be found, registered users can request adding new shows, also previous requests can be followed.</p></li>
                            <li><p>Logged in user can add series to a private watchlist which is not visible for other users.</p></li>
                            <li><p>Shows can be managed and show progression can be tracked.</p></li>
                        </ul>
                    </div>
                </div>
                <div className="whiteContainer redContainer">
                    <a className="link" href="https://www.figma.com/file/GxlmaqZrrNTeK2ZhSQSAmR/Track-My-Series?node-id=0%3A1">Figma wireframe of the project</a>
                </div>

                <div className='whiteContainer'>
                    <h3>Project development</h3>
                    <div>
                        <p className="simpleText">Building up the functions step-by-step: </p>
                        <ul className="uList">
                            <li>Even more detailed and personalized profile for users.</li>
                            <li>Upcoming episodes can be listed independently.</li>
                            <li>Design is fully responsive - sidebar and navbar.</li>
                            <li>Own database of series, no need or external API call.</li>
                            <li>Nurturing TV show requests - admin profile maybe.</li>
                            <li>A relational database might work better.</li>
                            <li>Managing shows are more detailed and user friendly.</li>
                            <li>Test cases are above 95%.</li>
                            <li>Restructured file system: models folder especially. </li>
                        </ul>
                    </div>
                </div>
                {/* {token ? <>
                    <p>Welcome</p>
                </> : <>
                    <button onClick={() => auth('google')}>Login with Google</button>
                    <button onClick={() => auth('oid')}>Log in with email</button>
                </>} */}
                <p>{token ? "Logged in" : "Anonymus user"}</p>

            </div>

        </>
    )
}

export default Home