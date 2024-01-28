'use client'

import { getAddressURL } from '@/utils/utils'
import Link from 'next/link'
import { Address } from 'viem'
import { useEnsName } from 'wagmi'

export function ENSName({
   address,
   hideLink,
}: {
   address: Address
   hideLink?: boolean
}) {
   const result = useEnsName({ chainId: 1, address: address })
   if (hideLink) {
      return <span className=''>{result.data}</span>
   } else {
      return (
         <span className='hover:underline'>
            <Link target='_blank' href={getAddressURL(address)}>
               {result.data}
            </Link>
         </span>
      )
   }
}
