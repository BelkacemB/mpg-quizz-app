/* eslint-disable react/prop-types */
import React from 'react'


export const MPGForm = () => {

    return (

        <div className="flex flex-wrap w-full">
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
                    <img src="/soccer_ball2.svg" alt="MPG Scout Logo" height="10"  width="60"/>

                    <a href="#" className="p-4 text-xl font-bold text-black bg-white h">
                        MPG Scout
                    </a>
                </div>
                <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                    <p className="text-3xl text-center">
                        Build your fantasy football team
                    </p>
                    <form className="flex flex-col pt-3 md:pt-8">
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <input type="text" id="design-login-password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="League" />
                            </div>
                        </div>
                        <div className="flex flex-col pt-4 mb-12">
                            <div className="flex relative ">

                                <input type="text" id="design-login-password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Mode" />
                            </div>
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                            <span className="w-full">
                                Build
                            </span>
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-1/2 shadow-2xl">
                <img className="hidden object-cover w-full h-screen md:block" src="/goat.jpg" />
            </div>
        </div>

    )
}
