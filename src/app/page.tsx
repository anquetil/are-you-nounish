import { AttestField } from "@/components/AttestField";
import { Leaderboard } from "@/components/Leaderboard";
import Link from "next/link";

export default async function Home() {
   return (
      <div className="p-4 bg-white flex flex-col space-y-4">
         <AttestField />
         <div className="flex flex-row gap-x-4 font-semibold">
            <div className=" text-gray-800 text-xl">Leaderboard</div>
            <Link href="/attestations" className=" hover:text-gray-700 text-gray-400 text-xl ease-in-out transition-all">Attestations</Link>
         </div>
         <Leaderboard/>
      </div>
   );
}
