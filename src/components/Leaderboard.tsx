'use client'

import useGetAttestations from "@/hooks/useGetAttestations";
import { generateLeaderboard } from "@/utils/utils";
import { ENSName } from "./ENSName";

export function Leaderboard(){
   const { attestations } = useGetAttestations(true);
   const leaderboard = attestations ? generateLeaderboard(attestations) : undefined

   return (
      <div>
         <div className="flex flex-row mb-2 text-gray-400">
            <div className="ml-10 w-60">Address</div>
            <div>Nounish Score</div>
         </div>
         {leaderboard?.map((p, id) => (
            <div className="flex flex-row" key={id}>
               <div className="font-normal w-10">{`${id + 1}.`}</div>
               <div className="w-60"><ENSName address={p[0]}/></div>
               <div>{p[1]}</div>
            </div>
         ))}
      </div>
   )
}