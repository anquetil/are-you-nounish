'use client'

import { easABI } from "@/utils/easABI"
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi"
import { Button } from "./Button"
import { AddressInput } from "./AddressInput"
import { useState } from "react"
import { Address } from "viem"
import { base } from "viem/chains"
import { CustomConnectButton } from "./CustomConnectButton"
import { TxnCycle } from "@/utils/utils"
import { useSearchParams } from "next/navigation"


export function AttestField(){
   const { isConnected, chainId } = useAccount()
   const searchParams = useSearchParams()
   const initialRecipient = searchParams.get('recipient') ? searchParams.get('recipient') as Address : undefined
   const [recipient, setRecipient] = useState<Address | undefined>(initialRecipient)
   const contractAddress = '0x4200000000000000000000000000000000000021'
   const schema = '0xc721f4649963e3bc019336ae6d5649fb67549d5548dd0500c668a27644ff3947'
   const schemaEncoder = new SchemaEncoder("bool nounish");
   const encodedData = schemaEncoder.encodeData([
      { name: "nounish", value: true, type: "bool" }
   ]) as `0x${string}`
   const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
   const { writeContract, status, data } = useWriteContract()
   const { data: result } = useTransactionReceipt({
      hash: data,
   })

   const txnState: TxnCycle =
      status == 'idle'
         ? 'IDLE'
         : status == 'pending'
            ? 'PREPARED'
            : result
               ? 'CONFIRMED'
               : status == 'error' ? 'IDLE' : 'SENT'


   return (
      <div>
         {
            isConnected && chainId == base.id ? (
               <div className="flex flex-row items-start gap-x-4 bg-yellow-100 p-4 pb-0 border-yellow-200 border rounded w-fit">
                  <AddressInput prefill={initialRecipient} returnAdmin={(address) => {setRecipient(address)}} />
                  <Button 
                     style="white" 
                     text="They're Nounish!" 
                     txnState={txnState}
                     txnHash={data}
                     onClick={() => {
                        if(recipient){
                           writeContract({
                              abi: easABI,
                              address: contractAddress,
                              functionName: 'attest',
                              args: [
                                 {
                                    schema: schema,
                                    data: {
                                       recipient: recipient,
                                       expirationTime: BigInt(0),
                                       revocable: true,
                                       refUID: ZERO_BYTES32,
                                       data: encodedData,
                                       value: BigInt(0),
                                    }
                                 }
                              ],
                           })
                        }
                     }} />
               </div>
            ) : <CustomConnectButton customMessage="Connect to Attest"/>
         }

      </div>

   )
}