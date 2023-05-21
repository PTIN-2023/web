import React, { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from 'flowbite-react'
import { HiShoppingCart } from 'react-icons/hi'
import { ShopContext } from '../context/shopContext'
import { CartItem }from "./cartItem"
import cartStyle from "../styles/cart.module.css"

const meds = [
    { id:1, name: "Ibuprofeno", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:2, name: "Omeoprazol", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:3, name: "Amoxicilina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:4, name: "Metformina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:5, name: "Lorazepam", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:6, name: "Aspirina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:7, name: "Cetirizina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:8, name: "Metroprolol", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    { id:9, name: "Simvastatina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
    /*{ id:10, name: "Nolotil", pvp: "4,68", forma: "solido", via: "oral", page: 1 }*/
]

const shoppingCartButton = () => {

    const { cartItems } = useContext(ShopContext);

    const [open, setOpen] = useState(false)

    const manageOnClick = () => {
        setOpen(!open);
    }

    const handleCheckoutClick = () => {
        alert("Su compra se ha transmitido");

        const medicamentos = [
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido con receta"
            },
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido sin receta"
            },
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido sin receta"
            },
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido sin receta"
            }
        ];

        fetch('/api/makeorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ medicamentos })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));

        const orderData = [
            {
                "name": "Ibuprofeno aa",
                "purchasing_date": "May 12, 2023",
                "state": "sent"
            },
            {
                "name": "Ibuprofeno ab",
                "purchasing_date": "May 12, 2023",
                "state": "sent"
            },
            {
                "name": "Ibuprofeno ac",
                "purchasing_date": "May 12, 2023",
                "state": "sent"
            },
            {
                "name": "Ibuprofeno ad",
                "purchasing_date": "May 12, 2023",
                "state": "sent"
            }];

        fetch('/api/makeorder_to_myorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
            });

        manageOnClick();
    }

    const handleButtonClick = () => {
        fetch('/api/orders')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <button onClick={handleButtonClick}>
                Ver datos de las órdenes
            </button>
            {/**Botón del carrito de compra, cuando hacemos click en el se abre el carrito deslizante  */}
            <Button onClick={manageOnClick}>
                <HiShoppingCart className="mr-2 h-5 w-5" />
                Carrito
            </Button>
            {/**función para abrir el carrito deslizante */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Carrito de Compra</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className={cartStyle.cart}>
                                                    <div className={cartStyle.cartItem}>
                                                        {meds.map((product) => {
                                                            if (cartItems[product.id] !== 0) {
                                                                return <CartItem data={product} />;
                                                            } 
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500"></p>
                                                <div className="mt-0">
                                                    <Button onClick={handleCheckoutClick} >
                                                        Pedir
                                                    </Button>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        o
                                                        <span aria-hidden="true"> </span>
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Seguir Comprando
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default shoppingCartButton;