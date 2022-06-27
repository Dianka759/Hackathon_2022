import React from 'react'
import trust from "../styles/icons8-trust-50.png"
import menu from "../styles/icons8-menu-80.png"
import school from "../styles/icons8-school-64.png"
import food from "../styles/icons8-foods-64.png"
import house from "../styles/icons8-house-64.png"
import { Link } from 'react-router-dom'

const Dashboard = () => {

    // Get All Axios Call?

    // 

    return (
        <div>
            <body>
                <div class="nav-bar">
                    <div class="nav-center">
                        <h1 class="logo">ResourceUkraine</h1>
                        <img src={trust} alt="hand with heart" />
                    </div>
                    <div class="flex">
                        <div class="dropdown">
                            <div class="dropbtn"><img src={menu} alt="hamburger menu" />
                            </div>
                            <div class="dropdown-content">
                                <a href="#">Schools</a>
                                <a href="#">Housing</a>
                                <a href="#">Food Suppliers</a>
                                <div class="login-reg">
                                    <a href="#">Login</a>
                                    <a href="#">Register</a>
                                </div>
                                {/* Link to Post (Pass id of user in session) */}
                                <div>
                                    Create a Post:
                                    {/* <Link to={`/users/messageboard/${_id}`}>MessageBoard</Link> */}
                                </div>
                            </div>
                        </div>
                        <p><a href="">EN</a> | <a href="">AU</a></p>
                    </div>
                </div>
                <div class="header">
                    <div class="header-left">
                    </div>
                    <div class="header-right">
                        <h2 class="heading-text">Our mission</h2>
                        <p class="header-text">Our team wanted to find an optimal way to help social issues in Ukraine. Although it is common to find websites with resources, to housing, schooling and food access, at this time. We believe finding help should be easy. That is why we created space where all these resources can come together in a categorized way.</p>
                    </div>
                </div>
                <div class="background">
                    <div class="content-box">
                        <img src={school} alt="school icon" />
                        <img src={food} alt="food icon" />
                        <img src={house} alt="house icon" />
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Dashboard