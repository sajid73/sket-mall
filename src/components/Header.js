import Image from 'next/image';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'

function Header() {
    return (
        <header>
            {/* 1st navigation with searchbar */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image 
                    src='https://uniqueguru.com/repo/images/rO87XGd.jpg'
                    width={150}
                    height={40}
                    objectFit="contain"
                    className='cursor-pointer'
                    />
                </div>
                {/* searchbar */}
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500' >
                    <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                    <SearchIcon className='h-12 p-4' />
                </div>
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div className='link'>
                        <p>Hello people</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    <div className='link'>
                        <p>Returns</p>
                        <p className="font-extrabold">& Orders</p>
                    </div>
                    <div className='link'>
                        <ShoppingCartIcon className="h-10" />
                        <p className="font-extrabold">Cart</p>
                    </div>
                </div>
            </div>
            {/* 2nd navigation of catagory */}
            <div></div>
        </header>
    )
}

export default Header
