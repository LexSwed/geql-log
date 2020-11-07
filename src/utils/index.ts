import { useRouter } from 'next/router'

export function useWorkspaceId() {
  const { query } = useRouter()

  return Number(query?.id?.[0])
}

export function useSchemaId(): number {
  const { query } = useRouter()
  return Number(query?.id?.[2])
}
