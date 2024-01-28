'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from './Button'
import { useSwitchChain } from 'wagmi'
import { base } from 'viem/chains'
export function CustomConnectButton({
   customMessage,
}: {
   customMessage?: string
}) {
   const wantedChain = base
   const { switchChain } = useSwitchChain()
   return (
      <ConnectButton.Custom>
         {({
            account,
            chain,
            openConnectModal,
            openAccountModal,
            authenticationStatus,
            mounted,
         }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
               ready &&
               account &&
               chain &&
               (!authenticationStatus ||
                  authenticationStatus === 'authenticated')
            return (
               <div
                  {...(!ready && {
                     'aria-hidden': true,
                     style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                     },
                  })}
               >
                  {(() => {
                        if (!connected) {
                           return (
                              <Button
                                 text={customMessage ?? 'Connect Wallet'}
                                 onClick={openConnectModal}
                                 style='white'
                              />
                           )
                        }
                        if (chain.id != wantedChain.id) {
                           return (
                              <Button
                                 text={`Switch to ${wantedChain.name}`}
                                 onClick={() => {
                                    switchChain({ chainId: wantedChain.id })
                                 }}
                                 style='white'
                              />
                           )
                        }
                        return (
                           <div onClick={openAccountModal} className='flex flex-row items-center text-gray-700 cursor-pointer'>
                                 <div className='flex flex-row items-center gap-x-1 px-3 py-1 border-gray-200 hover:bg-gray-50 bg-white ease-in-out transition-all duration-200 rounded-md border'>
                                    {account.ensAvatar && (
                                       // eslint-disable-next-line @next/next/no-img-element
                                       <img
                                          alt={account.displayName}
                                          src={account.ensAvatar}
                                          style={{ width: 16, height: 16 }}
                                       />
                                    )}
                                    {account.displayName}
                                 </div>
                           </div>
                        )
                  })()}
               </div>
            )
         }}
      </ConnectButton.Custom>
   )
}
