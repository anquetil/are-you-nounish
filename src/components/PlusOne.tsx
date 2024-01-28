import { Address } from "viem";
import { easABI } from "@/utils/easABI"
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { useAccount, useTransactionReceipt, useWriteContract } from "wagmi"
import { Button } from "./Button"
import { base } from "viem/chains"
import { CustomConnectButton } from "./CustomConnectButton"
import { TxnCycle } from "@/utils/utils"

export function PlusOne({recipient}: {recipient: Address}){
   const { isConnected, chainId } = useAccount()
   const contractAddress = '0x4200000000000000000000000000000000000021'
   const schema = '0xc721f4649963e3bc019336ae6d5649fb67549d5548dd0500c668a27644ff3947'
   const schemaEncoder = new SchemaEncoder("bool nounish");
   const encodedData = schemaEncoder.encodeData([{ name: "nounish", value: true, type: "bool" }]) as `0x${string}`
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
      <div className="">
         {
            isConnected && chainId == base.id ? (
               <Button
                  style="white"
                  text="⌐◨-◨"
                  txnState={txnState}
                  txnHash={data}
                  onClick={() => {
                     if (recipient) {
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
            ) : <CustomConnectButton customMessage="Connect to Attest" />
         }
      </div>
   )

}