import { useEffect, useState } from "react";
import { WalletClient, type HttpTransport, PublicClient } from "viem";
import {  usePublicClient } from "wagmi";
import {   useWalletClient } from "wagmi";
import type { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";

export function publicClientToProvider(publicClient: PublicClient) {
   const { chain, transport } = publicClient;
   const network = {
      chainId: chain!.id,
      name: chain!.name,
      ensAddress: chain!.contracts?.ensRegistry?.address,
   };
   if (transport.type === "fallback")
      return new ethers.FallbackProvider(
         (transport.transports as ReturnType<HttpTransport>[]).map(
            ({ value }) => new ethers.JsonRpcProvider(value?.url, network),
         ),
      );
   return new ethers.JsonRpcProvider(transport.url, network);
}

export function walletClientToSigner(walletClient: WalletClient) {
   const { account, chain, transport } = walletClient;
   const network = {
      chainId: chain!.id,
      name: chain!.name,
      ensAddress: chain!.contracts?.ensRegistry?.address,
   };
   const provider = new ethers.BrowserProvider(transport, network);
   const signer = provider.getSigner(account!.address);
   return signer;
}

export function useSigner() {
   const { data: walletClient } = useWalletClient();

   const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
   useEffect(() => {
      async function getSigner() {
         if (!walletClient) return;

         const tmpSigner = await walletClientToSigner(walletClient) as unknown as JsonRpcSigner;

         setSigner(tmpSigner);
      }

      getSigner();

   }, [walletClient]);
   return signer;
}


export function useProvider() {
   const publicClient = usePublicClient();

   const [provider, setProvider] = useState<JsonRpcProvider | undefined>(undefined);
   useEffect(() => {
      async function getSigner() {
         if (!publicClient) return;

         const tmpProvider = publicClientToProvider(publicClient);

         setProvider(tmpProvider as unknown as JsonRpcProvider);
      }

      getSigner();

   }, [publicClient]);
   return provider;
}