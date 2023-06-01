import { gql, useQuery } from '@apollo/client'

export function useNothing() {
  const getNothing = gql`
    query MyQuery {
      profiles {
        uid
      }
    }
  `
  return useQuery(getNothing)
}
