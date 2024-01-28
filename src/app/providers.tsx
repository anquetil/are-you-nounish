'use client'

import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { http, WagmiProvider } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new ApolloClient({
   uri: 'https://base.easscan.org/graphql',
   cache: new InMemoryCache(),
})

const config = getDefaultConfig({
   appName: 'Are You Nounish ?',
   projectId: '023cdeb533db1bcd5a099bf4677e0808',
   chains: [base, mainnet],
   transports: {
      [base.id]: http(process.env.NEXT_PUBLIC_BASE),
      [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET),
   },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
   const [mounted, setMounted] = React.useState(false)
   React.useEffect(() => setMounted(true), [])
   return (
      <ApolloProvider client={client}>
         <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
               <RainbowKitProvider>
                  {mounted && children}
               </RainbowKitProvider>
            </QueryClientProvider>
         </WagmiProvider>
      </ApolloProvider>
   )
}
