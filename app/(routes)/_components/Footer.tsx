import { FaInstagram, FaPinterestP } from "react-icons/fa";
import { PiYoutubeLogo } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { RiLinkedinFill } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";

import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className='text-center border-t flex flex-col px-20 xl:px-40'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 justify-end items-start gap-y-12'>
                    <div className='flex flex-col items-start gap-2 lg:mx-auto'>
                        <p style={{ color: "#ff6700" }} className='font-bold text-lg mb-1'>Kurumsal</p>
                        <Link href={"/"} className='text-sm text-gray-700'>Hakkımızda</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>İş Ortaklarımız</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>Kariyer</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>Yatırımcı İlişkileri</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>KVKK</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>İletişim</Link>
                    </div>
                    <div className='flex flex-col items-start gap-2 lg:mx-auto'>
                        <p style={{ color: "#ff6700" }} className='font-bold text-lg mb-1'>SanalSepet</p>
                        <Link href={"/"} className='text-sm text-gray-700'>Satıcı Olmak İstiyorum</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>Ödeme Seçenekleri</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>Banka Kampanyaları</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>İşlem Rehberi</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>Yatırımcı İlişkileri</Link>
                        <Link href={"/"} className='text-sm text-gray-700'>Tedarikçi Kuralları</Link>
                    </div>
                    <div className='flex flex-col items-start gap-2 lg:mx-auto'>
                        <p style={{ color: "#ff6700" }} className='font-bold text-lg mb-1'>Bizi Takip Edin</p>
                        <Link href={"/"} className=''>
                            <div className='flex flex-row items-center'>
                                <div className="border rounded-full h-8 w-8 flex justify-center items-center ">
                                    <FaInstagram className="h-5 w-5" />
                                </div>
                                <p className='text-sm text-gray-700 ml-2'>İnstagram</p>
                            </div>
                        </Link>
                        <Link href={"/"} className=''>
                            <div className='flex flex-row items-center'>
                                <div className="border rounded-full h-8 w-8 flex justify-center items-center ">
                                    <PiYoutubeLogo className="h-5 w-5" />
                                </div>
                                <p className='text-sm text-gray-700 ml-2'>Youtube</p>
                            </div>
                        </Link>
                        <Link href={"/"} className=''>
                            <div className='flex flex-row items-center'>
                                <div className="border rounded-full h-8 w-8 flex justify-center items-center ">
                                    <SlSocialFacebook className="h-5 w-5" />
                                </div>
                                <p className='text-sm text-gray-700 ml-2'>Facebook</p>
                            </div>
                        </Link>
                        <Link href={"/"} className=''>
                            <div className='flex flex-row items-center'>
                                <div className="border rounded-full h-8 w-8 flex justify-center items-center ">
                                    <FaPinterestP className="h-5 w-5" />
                                </div>
                                <p className='text-sm text-gray-700 ml-2'>Pinterest</p>
                            </div>
                        </Link>
                        <Link href={"/"} className=''>
                            <div className='flex flex-row items-center'>
                                <div className="border rounded-full h-8 w-8 flex justify-center items-center ">
                                    <RiLinkedinFill className="h-5 w-5" />
                                </div>
                                <p className='text-sm text-gray-700 ml-2'>Linkedin</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col items-start gap-2 lg:mx-auto'>
                        <p style={{ color: "#ff6700" }} className='font-bold text-lg mb-1'>Bize Ulaşın</p>
                        <Link href={"/"} className='text-sm text-gray-700 mb-1'>Çağrı Merkezimizi Arayın</Link>
                        <div className="flex flex-row items-center px-3 py-2 rounded-xl border">
                            <BsTelephone className="h-4 w-4 text-gray-800 mr-2" />
                            <Link href={"/"} className='text-lg font-semibold text-gray-700'>0850 333 22 11</Link>
                        </div>
                    </div>
                </div>
            </footer>
            <div className='border-t py-4 text-center flex flex-col px-20 xl:px-40 text-gray-700 font-medium text-sm'>Developed by Mert Koçak</div>
        </>
    )
}

export default Footer