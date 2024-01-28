import { AttestField } from "@/components/AttestField";
import { Leaderboard } from "@/components/Leaderboard";
import { createConfig, getClient, http } from "@wagmi/core";
import { ResolvingMetadata, Metadata } from "next";
import Link from "next/link";
import { Address } from "viem";
import { mainnet } from "viem/chains";
import { getEnsName } from "viem/ens";

type Props = {
   params: { id: string }
   searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
   { params, searchParams }: Props,
   parent: ResolvingMetadata
): Promise<Metadata> {
   // read route params
   const recipient = searchParams['recipient'] ? searchParams['recipient'] as Address : undefined

   const config = createConfig({
      chains: [mainnet],
      transports: {
         [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET),
      },
   })
   const publicClient = getClient(config)


   // fetch data
   if(recipient){
      const ens = await getEnsName(publicClient, {
         address: recipient,
      })

      const displayAddress = ens ?? recipient.substring(0,10)

      return {
         title: `Is ${displayAddress} Nounish?`,
         description: `Let them know onchain!`
      }
   } else {
      return {
         title: "Are You Nounish?",
         description: "Prove it onchain",
      }
   }

}

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
