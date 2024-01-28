'use client'

import useGetAttestations from "@/hooks/useGetAttestations";
import { generateLeaderboard } from "@/utils/utils";
import { ENSName } from "./ENSName";
import { PlusOne } from "./PlusOne";

export function Leaderboard(){
   const { attestations } = useGetAttestations(true);
   const leaderboard = attestations ? generateLeaderboard(attestations) : undefined

   return (
      <div>
         <div className="flex flex-row mb-2 text-gray-400">
            <div className="ml-10 w-60">Address</div>
            <div>Score</div>
         </div>
         {leaderboard?.map((p, id) => (
            <div className="flex flex-row items-center mb-2" key={id}>
               <div className="font-normal w-10">{`${id + 1}.`}</div>
               <div className="w-60"><ENSName address={p[0]}/></div>
               <div className="w-20">{p[1]}</div>
               <PlusOne recipient={p[0]} />
            </div>
         ))}
      </div>
   )
}