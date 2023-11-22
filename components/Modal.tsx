'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import LogoSVG from '@/public/assets/icons/logo.svg'
import CloseSVG from '@/public/assets/icons/x-close.svg'
import MailSVG from '@/public/assets/icons/mail.svg'


const Modal = () => {
    let [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)

    const closeModal = () => setIsOpen(false)
    return (
        <>
            <button type='button' className='btn' onClick={openModal}>
                Track
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' onClose={closeModal} className='dialog-container'>
                    <div className='min-h-screen px-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className='fixed inset-0' />
                        </Transition.Child>
                        <span className='inline-block h-screen align-middle' aria-hidden='true'>
                            tesst
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <div className='dialog-content'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between'>
                                        <div className='p-3 border border-gray-200 rounded-10'>
                                            <Image
                                                src={LogoSVG}
                                                alt='logo'
                                                width={28}
                                                height={28}
                                            />
                                        </div>
                                        <Image
                                            src={CloseSVG}
                                            alt='close'
                                            width={24}
                                            height={24}
                                            className='cursor-pointer'
                                            onClick={closeModal}
                                        />
                                    </div>
                                    <h4 className='dialog-head_text'>Stay updated with product pricing alerts right in your Inbox!</h4>
                                    <p className='text-sm text-gray-600 mt-2'>Never miss a bargain again with out timely alerts</p>
                                </div>
                                <form className="flex flex-col mt-5">
                                    <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email address</label>
                                    <div className='dialog-input_container'>
                                        <Image
                                            src={MailSVG}
                                            alt='mail'
                                            width={18}
                                            height={18}
                                        />
                                        <input
                                            required
                                            type='email'
                                            id='email'
                                            placeholder='Enter your email address'
                                            className='dialog-input'
                                        />
                                    </div>
                                    <button type='submit' className='dialog-btn'>
                                        Track
                                    </button>
                                </form>
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal