import React, { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from 'flowbite-react'
import { HiShoppingCart } from 'react-icons/hi'
import { ShopContext } from '../../context/shopContext'
import { CartItem }from "./cartItem"
import cartStyle from "../../styles/cart.module.css"
import useCookie from '../../hooks/useCookie'
import { useRouter } from 'next/router'

const shoppingCartButton = () => {
    const [userTokenCookie, ] = useCookie('user_token')
    const { cartItems } = useContext(ShopContext);
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [QRcode, setQRcode] = useState(false)

    const handleQRcode = () => {
        setQRcode(!QRcode)
    }

    const manageOnClick = () => {
        setOpen(!open);
    }

    const handleSubmit = async (e) => {
        // Prevent from refresh page
        e.preventDefault()
        
        // get form data
        const form = e.target
        const QRcode = new FormData(form)

        const formJson = Object.fromEntries(QRcode.entries());
        console.log(formJson);
    }

    const handleCheckoutClick = async () => {
        const medicine_identifiers = Object.entries(cartItems).flatMap(([key, value]) =>
            Array(Number(value.amount)).fill(key)
        );

        // Make the order
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
                amount : 3 // TODO: calculate this
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
                                                        {console.log(Object.entries(cartItems).length)}
                                                        {Object.entries(cartItems).map((entry) => {
                                                            if (entry[1].amount != 0) {
                                                                return <CartItem item={entry[1].medicine} />;
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="fixed bottom-0 w-full border-t border-gray-200 px-4 py-6 sm:px-6 mb-5">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500"></p>

                                                {!QRcode
                                                    ?   <div className="mt-0 flex justify-center">
                                                            <Button disabled={Object.entries(cartItems).length === 0} onClick={handleCheckoutClick} >
                                                                Pedir
                                                            </Button>
                                                            <p style={{ marginLeft: 40, marginRight: 40, marginTop: 10}}> o </p>
                                                            <Button onClick={handleQRcode}>
                                                                Insertar código
                                                            </Button>
                                                        </div>
                                                    :   <div className="ml-3 flex h-7 items-center p-11">
                                                            <form method='get' onSubmit={handleSubmit}>
                                                                <label style={{ padding: 5 }}>
                                                                    Inserta tu còdigo: <input name='QRcode' style={{ padding: 12, margin: 5 ,border: '1px solid' }} />
                                                                </label>
                                                                <Button className='ml-1' type='submit'>Añadir</Button>
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
                                                {!QRcode && <div className="mt-5 flex justify-center text-center text-sm text-gray-500">
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

export default shoppingCartButton;