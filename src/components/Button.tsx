

import { getTxnURL } from '@/utils/utils'
import { TxnCycle } from '@/utils/utils'
import Link from 'next/link'

export function Button({
   style,
   text,
   onClick,
   txnState,
   txnHash,
}: {
   style: 'red' | 'black' | 'white'
   text: string
   onClick?: () => void
   txnState?: TxnCycle
   txnHash?: string
}) {
   const red = style == 'red'
   const black = style == 'black'
   const white = style == 'white'

   if (txnState == 'SENT') {
      return (
         <div
            className={`flex flex-row items-center gap-x-5 px-3 py-[6px] ease-in-out transition-all w-fit text-gray-500 text-base font-normal  `}
         >
            <svg
               width='24'
               height='24'
               viewBox='0 0 24 24'
               xmlns='http://www.w3.org/2000/svg'
            >
               <circle cx='4' cy='12' r='3' fill='#777777'>
                  <animate
                     id='spinner_qFRN'
                     begin='0;spinner_OcgL.end+0.25s'
                     attributeName='cy'
                     calcMode='spline'
                     dur='0.6s'
                     values='12;6;12'
                     keySplines='.33,.66,.66,1;.33,0,.66,.33'
                  />
               </circle>
               <circle cx='12' cy='12' r='3' fill='#777777'>
                  <animate
                     begin='spinner_qFRN.begin+0.1s'
                     attributeName='cy'
                     calcMode='spline'
                     dur='0.6s'
                     values='12;6;12'
                     keySplines='.33,.66,.66,1;.33,0,.66,.33'
                  />
               </circle>
               <circle cx='20' cy='12' r='3' fill='#777777'>
                  <animate
                     id='spinner_OcgL'
                     begin='spinner_qFRN.begin+0.2s'
                     attributeName='cy'
                     calcMode='spline'
                     dur='0.6s'
                     values='12;6;12'
                     keySplines='.33,.66,.66,1;.33,0,.66,.33'
                  />
               </circle>
            </svg>
            <div className=' '>Waiting...</div>
            <Link
               className=' underline underline-offset-2 '
               target='_blank'
               href={getTxnURL(txnHash)}
            >
               Txn
            </Link>
         </div>
      )
   } else if (txnState == 'CONFIRMED') {
      return (
         <div
            className={`flex flex-row items-center gap-x-2 px-3 py-[6px]   hover:cursor-pointer ease-in-out transition-all w-fit text-green-700  text-base font-normal  `}
         >
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='20'
               height='20'
               viewBox='0 0 24 24'
               fill='none'
               stroke='currentColor'
               strokeWidth='3'
               strokeLinecap='round'
               strokeLinejoin='round'
            >
               <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
            <Link
               className=' underline underline-offset-2 '
               target='_blank'
               href={getTxnURL(txnHash)}
            >
               Attested!
            </Link>
         </div>
      )
   }
   return (
      <div
         className={`px-3 py-[6px] border rounded text-base font-medium hover:cursor-pointer ease-in-out transition-all w-fit h-fit max-h-fit
            ${red && `bg-[#FF0420] hover:bg-[#eb001a] active:bg-[#ff364d] text-gray-50 border-transparent`} 
            ${white && `bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 border-gray-300`} 
            ${black && `bg-gray-950 hover:bg-gray-700 active:bg-gray-800 text-gray-50 border-transparent`}
         `}
         onClick={onClick}
      >
         {text}
      </div>
   )
}
