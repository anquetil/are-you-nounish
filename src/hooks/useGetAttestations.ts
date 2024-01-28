import { gql, useQuery } from '@apollo/client'
import { Address, isAddressEqual } from 'viem'

export function useGetAttestations(enabled: boolean) {
   const query = gql`query Attestations($where: AttestationWhereInput) {
  attestations(where: $where) {
    id
    schemaId
    attester
    recipient
    data
    revoked
  }
}`

   const where = 
   {
      schemaId: {
         contains: "0xc721f4649963e3bc019336ae6d5649fb67549d5548dd0500c668a27644ff3947"
      },
   }

   const { data, loading } = useQuery(query, {
      skip: !enabled,
      variables: { where },
   })

   const rawAttestations: {
      id: string,
      schemaId: string,
      attester: Address,
      recipient: Address,
      data: string,
      revoked: boolean,
   }[] = data ? data.attestations : undefined

   const attestations: {
      id: string,
      schemaId: string,
      attester: Address,
      recipient: Address,
      nounish: boolean,
      revoked: boolean,
   }[] = rawAttestations?.map(attestation => ({
      id: attestation.id,
      schemaId: attestation.schemaId,
      attester: attestation.attester,
      recipient: attestation.recipient,
      nounish: attestation.data.endsWith("1"),
      revoked: attestation.revoked
   }))?.filter(a => !a.revoked && a.nounish && !isAddressEqual(a.attester, a.recipient))

   return {
      attestations,
      loading,
   }
}

export default useGetAttestations
