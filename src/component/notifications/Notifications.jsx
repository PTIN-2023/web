import React, { useState } from "react";
import { Tabs } from 'flowbite-react';
import { HiClock, HiOutlineBell } from 'react-icons/hi';
import NotificationsPending from "./NotificationsPending.jsx";
import NotificationsRecord from "./NotificationsRecord.jsx";



function NotificationList() {
    return (
        <Tabs.Group
            aria-label="pills"
            style="underline"
        >
            <Tabs.Item 
                title="Notificaciones"
                icon={HiOutlineBell}
            >
                <NotificationsPending />
            </Tabs.Item>
            <Tabs.Item
                active={true}
                title="Historial"
                icon={HiClock}
            >
                <NotificationsRecord />
            </Tabs.Item>
        </Tabs.Group>
    );
}

export default NotificationList;