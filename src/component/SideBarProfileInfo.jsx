import React from 'react';
import { Avatar } from "flowbite-react";
import layoutStyles from "../styles/Layout.module.css";
import useCookie from '../hooks/useCookie';

export default function SideBarProfileInfo({ isCollapsed }){
    const [userFullName,] = useCookie('user_full_name');
    const [userRole,] = useCookie('user_role')

    return(
        <Avatar
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        rounded={true}
        >
        {!isCollapsed &&
            //muestra el avatar y el nombre
            <div className={layoutStyles.sideBarAvatarName}>
                <div>
                {userFullName}
                </div>
                <div className={layoutStyles.sideBarAvatarRole}>
                {userRole}
                </div>
            </div> 
        
        }
        </Avatar>
    )
}