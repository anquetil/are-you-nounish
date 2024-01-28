import { Address } from "viem"

export type TxnCycle = 'IDLE' | 'PREPARED' | 'SENT' | 'CONFIRMED'
export type Attestation = {
   id: string,
   schemaId: string,
   attester: Address,
   recipient: Address,
   nounish: boolean,
   revoked: boolean,
}

export function getTxnURL(txnHash: string | undefined) {
   return `https://basescan.org/tx/${txnHash}`
}

export function getAddressURL(address: string | undefined) {
   return `https://basescan.org/address/${address}`
}

export function getAttestationURL(id: string | undefined) {
   return `https://base.easscan.org/attestation/view/${id}`
}

export function generateLeaderboard(attestations: Attestation[]){
   const leaderboard = new Map<Address, number>()
   attestations.forEach(attestation => {
      const { recipient } = attestation;
      if (leaderboard.has(recipient)) {
         leaderboard.set(recipient, leaderboard.get(recipient)! + 1);
      } else {
         leaderboard.set(recipient, 1);
      }
   });
   return Array.from(leaderboard.entries()).sort((a, b) => b[1] - a[1]);
}
