import { AllAttestations } from "@/components/AllAttestations";
import { AttestField } from "@/components/AttestField";
import Link from "next/link";

export default async function AttestationsPage(){
   return (
      <div className="p-4 bg-white  flex flex-col space-y-4">
         <AttestField />
         <div className="flex flex-row gap-x-4 font-semibold">
            <Link href="/" className=" hover:text-gray-700 text-gray-400 text-xl ease-in-out transition-all">Leaderboard</Link>
            <div className=" text-gray-800 text-xl">Attestations</div>

         </div>
         <AllAttestations />
      </div>
   )
}