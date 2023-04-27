import Layout from "../component/Layout";
import React from "react";

export default function Custom404() {

    return (
        <>
        <Layout>
            
            
            <p className="text-center text-gray-900 text-7xl dark:text-white">404</p>
            <p className="text-center text-gray-900 text-5xl dark:text-white">Página no encontrada</p>

    
            <div class="authButtons basis-1 flex flex-col items-center justify-center">
                <button type="button" class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Volver al perfil</button>
            </div>
                     
        </Layout>
    </>
    )
}