import React, { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Dropdown } from 'flowbite-react'
import { HiShoppingCart } from 'react-icons/hi'
import { ShopContext } from '../../context/shopContext'
import { CartItem }from "./cartItem"
import cartStyle from "../../styles/cart.module.css"
import useCookie from '../../hooks/useCookie'
import { useRouter } from 'next/router'

const ShoppingCart = () => {
    const [userTokenCookie, ] = useCookie('user_token')
    // Form values

    const { cartItems } = useContext(ShopContext);
    const router = useRouter()

    const [open, setOpen] = useState(false) //para abrir el carrito deslizante
    const [QRcode, setQRcode] = useState(false) //para saber si le hemos dado a introducir código
    const [codeIn, setCodeIn] = useState(false); //para saber si hemos introducido el código
    const [drop, setDrop] = useState(false) //dropdown

    const toggleDropdown = () => {
        setDrop(!drop);
    };

    const handleQRcode = () => {
        setQRcode(!QRcode)
    }

    const manageOnClick = () => {
        setOpen(!open);
    }

    const handleSubmit = async (e) => {
        // Prevent from refresh page
        // e.preventDefault()
        
        // get form data
        const form = e.target
        const QRcode = new FormData(form)

        const formJson = Object.fromEntries(QRcode.entries());
        console.log(formJson.QRcode);

        setQRcode(!QRcode)
        setCodeIn(true)
    }

    const handleCheckoutClick = async () => {
        // Calculate price to pay
        var amount = 0
        Object.entries(cartItems).forEach(([key, value]) => {
            amount = amount + value.amount*value.medicine.pvp
        })
        console.log(amount)

        // Make the order
        const medicine_identifiers = Object.entries(cartItems).map(([key, value]) =>
            [key, value.amount]
        );

        const makeOrderResult = await fetch('/api/make_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                session_token : userTokenCookie,
                medicine_identifiers : medicine_identifiers
            })
        })
        .then(res => res.json())

        if(!makeOrderResult || makeOrderResult.result != 'ok') {
            alert("Error en procesar su compra");
            setOpen(false)
            return;
        }

        // Generate paypal url
        const createPaymentResult = await fetch('/api/create_payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                session_token : userTokenCookie,
                order_identifier : makeOrderResult.order_identifier ? makeOrderResult.order_identifier : 123,
                amount : amount
            })
        })
        .then(res => res.json())

        if(!createPaymentResult || createPaymentResult.result != 'ok') {
            alert("Error en procesar su compra");
            setOpen(false)
            return;
        }

        // Redirect to url
        router.push(createPaymentResult.url)
    }

    return (
        <>
            {/**Botón del carrito de compra, cuando hacemos click en el se abre el carrito deslizante  */}
            <Button className="bg-blue-600" onClick={manageOnClick}>
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
                                                    {/** DropDown Pedir */}
                                                    <div>
                                                        <div>
                                                        <button
                                                            id="dropdownDefaultButton"
                                                            data-dropdown-toggle="dropdown"
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            type="button"
                                                            onClick={toggleDropdown}
                                                        >
                                                            Gestionar{' '}
                                                            <svg
                                                            className="w-4 h-4 ml-2"
                                                            aria-hidden="true"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                            <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                                            </svg>
                                                        </button>
                                                        {drop && (
                                                            <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                            <ul className="py-2 text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                                <li>
                                                                    <button onClick={handleCheckoutClick} disabled={Object.entries(cartItems).length === 0} className='w-full h-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'>
                                                                        Pedir
                                                                        <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                                                                            {Object.entries(cartItems).length}
                                                                        </span>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button disabled={codeIn} className='w-full h-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800' onClick={handleQRcode}>
                                                                        Insertar código
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                            </div>
                                                        )}
                                                        </div>
                                                    </div>

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
                                                
                                                {Object.entries(cartItems).length <= 0 && 
                                                    <Dialog.Panel className="font-medium text-indigo-600 hover:text-indigo-500 opacity-75 mt-10">
                                                        Todavia no tienes productos en el carrito. Sigue comprando!
                                                    </Dialog.Panel>
                                                }
                                                
                                                <div className={cartStyle.cart}>
                                                    <div className={cartStyle.cartItem}>
                                                        {Object.entries(cartItems).length > 0
                                                            && Object.entries(cartItems).map((entry) => {
                                                                if (entry[1].amount != 0) {
                                                                    return <CartItem item={entry[1].medicine} />;
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                            {QRcode && 
                                                    <div className=" mt-full flex h-full w-full items-center p-11 bg-white">
                                                            <form method='get' onSubmit={handleSubmit}>
                                                                <label style={{ padding: 5 }}>
                                                                    Inserta tu còdigo: <input name='QRcode' style={{ padding: 12, margin: 5 ,border: '1px solid' }} />
                                                                </label>
                                                                <Button className='ml-1' type='submit'>Pedir medicamentos</Button>
                                                            </form>
                                                            <button
                                                                type="button"
                                                                className="-m-5 text-gray-400 hover:text-gray-500 mb-14"
                                                                onClick={handleQRcode}
                                                            >
                                                                <span className="sr-only">Close panel</span>
                                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                            
                                                    </div>
                                                }
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

export default ShoppingCart;