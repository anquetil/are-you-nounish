'use client'
import useGetAttestations from "@/hooks/useGetAttestations"
import { ENSName } from "./ENSName"
import { getAttestationURL } from "@/utils/utils"
import Link from "next/link"


export function AllAttestations(){
   const { attestations } = useGetAttestations(true);

   return (
      <div className="">
         <div className="flex flex-row text-gray-600 font-semibold">
            <div className="w-64">From</div>
            <div className="w-64">To</div>
            <div className="w-16">Link</div>
         </div>
         {attestations?.map((a) => (
            <div className="flex flex-row" key={a.id}>
               <div className="w-64 flex flex-col text-gray-950">
                  <ENSName address={a.attester}/>
               </div>
               <div className="w-64 flex flex-col text-gray-950">
                  <ENSName address={a.recipient} />
               </div>
               <Link target="_blank" href={getAttestationURL(a.id)} className="w-16 flex flex-col hover:underline text-gray-500">
                  {`${a.id.substring(0,10)}`}
               </Link>
            </div>
         ))}
      </div>
   )
}