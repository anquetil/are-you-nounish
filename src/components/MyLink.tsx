'use client'
import { useRef, useState } from "react";
import { useAccount } from "wagmi";

export function MyLink(){
   const { isConnected, address } = useAccount();
   const [toast, setToast] = useState<boolean>(false)

   function copyToClipboard(nav: Navigator) {
      void nav.clipboard.writeText(`https://are-you-nounish.vercel.app/?recipient=${address}`)
   }

   const parentDivRef = useRef<HTMLDivElement>(null)

   function handleClick() {
      copyToClipboard(navigator)
      setToast(true)
      setTimeout(function () {
         setToast(false)
      }, 1000)
   }

   return (
      <div>
         <div className='relative' onClick={handleClick}>
            <div
               className={`z-100 text-xs top-10 translate-x-[25%] whitespace-nowrap py-1 w-fit absolute px-2 bg-black rounded-sm text-white ease-in-out transition-all duration-200 
                  ${toast
                     ? 'bg-opacity-90 text-opacity-90'
                     : 'bg-opacity-0 text-opacity-0'
                  }`}
            >
               {`Copied link!`}
            </div>

            <div
               className={`px-3 py-[6px] border rounded text-base font-medium hover:cursor-pointer ease-in-out transition-all 
            w-fit h-fit min-h-0 max-h-fit bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 border-gray-300 `}
               onClick={handleClick}
            >
               {`Share my link`}
            </div>
         </div>
      </div>
   )
}