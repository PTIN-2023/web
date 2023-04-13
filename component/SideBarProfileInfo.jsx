import React from 'react';
import { Avatar } from "flowbite-react";
import layoutStyles from "../styles/Layout.module.css";
import { UserData } from './UserData';

export default function SideBarProfileInfo({ isCollapsed }){
    const profilePlaceholder = UserData;

    return(
        

        <Avatar
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        rounded={true}
        >
        {!isCollapsed &&

            <div className={layoutStyles.sideBarAvatarName}>
                <div>
                {profilePlaceholder.name}
                </div>
                <div className={layoutStyles.sideBarAvatarRole}>
                {profilePlaceholder.role}
                </div>
            </div> 
        
        }
        
        </Avatar>        

    )
}