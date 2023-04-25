import { setCookie, getCookie } from 'cookies-next';
import { useState, useEffect } from "react";

const useCookie = (key, defaultValue) => {
    const [cookie, setCookieValue] = useState(null);
  
    useEffect(() => {
        const storedCookie = getCookie(key);
        if (storedCookie) {
            setCookieValue(JSON.parse(storedCookie));
        } else {
            setCookieValue(defaultValue);
        }
    }, []);

    const updateCookie = (value, options) => {
        setCookie(key, JSON.stringify(value), options);
        setCookieValue(value);
    };

    return [cookie, updateCookie];
};
  
export default useCookie;