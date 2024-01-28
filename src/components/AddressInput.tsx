import { useState } from 'react'
import { Address, isAddress } from 'viem'
import { normalize } from 'viem/ens'
import { useEnsAddress, useEnsName } from 'wagmi'

export function AddressInput({
   returnAdmin,
   prefill,
}: {
   // eslint-disable-next-line no-unused-vars
   returnAdmin: (address: `0x${string}`) => void,
   prefill: Address | undefined
}) {
   const [inputValue, setInputValue] = useState<string>(prefill ?? '')
   const [info, setInfo] = useState<string>('')

   const tryToResolve = inputValue.includes('.eth')

   const { data } = useEnsAddress({
      chainId: 1,
      name: tryToResolve ? inputValue : undefined, // only enable if tryToResolve is true
   })

   const nameResult = useEnsName({
      chainId: 1,
      address: isAddress(inputValue) ? inputValue : undefined
   })
   console.log(inputValue, isAddress(inputValue), 'nameresult', nameResult)

   if (
      data &&
      data != '0x0000000000000000000000000000000000000000' &&
      info != data
   ) {
      // FOUND ADDRESS FOR ENS
      returnAdmin(data)
      setInfo(data)
   } else if (
      tryToResolve &&
      info != 'This ENS has no resolved address' &&
      info != data
   ) {
      // DID NOT FIND ADDRESS FOR ENS
      setInfo('This ENS has no resolved address')
   }  else if (isAddress(inputValue) && nameResult.data && info != nameResult.data) {
      console.log('settign ENS', nameResult.data)
      setInfo(nameResult.data)
   }
   
   else {
      console.log('no state change')
   }

   return (
      <div>
         <input
            className='rounded p-[6px] text-gray-600 border border-neutral-200 min-w-[200px] sm:min-w-[420px]  focus:border-neutral-400 focus:outline-none'
            type='text'
            name='newAdmin'
            id='newAdmin'
            placeholder='Enter an address or ENS here..'
            defaultValue={prefill ?? ''}
            onChange={(e) => {
               console.log(e.target.value)
               if (e.target.value == '') {
                  setInputValue('')
                  setInfo('')
               } else if (isAddress(e.target.value)) {
                  setInputValue(e.target.value)
                  returnAdmin(e.target.value as Address)
                  setInfo(e.target.value)
                  // call back send value
               } else {
                  setInputValue(e.target.value)
                  if (tryToResolve) {
                     setInfo('Checking ENS...')
                  } else {
                     setInfo('Not valid ENS or Address')
                  }
               }
            }}
         />
         <div className='text-gray-600 mt-1 mb-3'>{info}</div>
      </div>
   )
}
