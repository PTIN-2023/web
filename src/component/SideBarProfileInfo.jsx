import React from 'react';
import { Avatar } from "flowbite-react";
import layoutStyles from "../styles/Layout.module.css";
import useCookie from '../hooks/useCookie';
import getTextCurrentLocale from '../utils/getTextCurrentLocale'

export default function SideBarProfileInfo({ isCollapsed }){
    const [userFullName,] = useCookie('user_given_name');
    const [userPicture,] = useCookie('user_picture');
    const [userRole,] = useCookie('user_role')
    const userRoleLocalized = getTextCurrentLocale('role_'+userRole)

    return(
        <Avatar
        img={userPicture}
        rounded={true}
        >
        {!isCollapsed &&
            //muestra el avatar y el nombre
            <div className={layoutStyles.sideBarAvatarName}>
                <div>
                {userFullName}
                </div>
                <div className={layoutStyles.sideBarAvatarRole}>
                {userRoleLocalized}
                </div>
            </div> 
        
        }
        </Avatar>
    )
}