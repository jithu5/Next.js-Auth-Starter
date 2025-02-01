function NavBar() {
    return (
        <>
            <nav className="bg-stone-700 p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">Welcome</h1>
                    <div className="space-x-4">
                        <div className="relative group">

                            <button
                                className=""
                            >
                                Home
                            </button>
                            {/* <div className="absolute bg-gray-200 right-0 top-[100%] hidden group-hover:flex flex-col rounded-md py-5 px-12 text-stone-700 w-fit">
                                <p className="hover:text-stone-900 cursor-pointer text-sm">verifyAccount</p>


                            </div> */}
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default NavBar
