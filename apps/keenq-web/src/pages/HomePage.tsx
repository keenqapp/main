import Page from '@/ui/Page'
import { useNothing } from '@/services/user'

// import AllEvents from '@/components/AllEvents'
// import MyEvents from '@/components/MyEvents'

export default function HomePage() {
  const { data } = useNothing()
  console.log('--- HomePage.tsx:9 -> HomePage -> data', data)

  return (
    <Page data-testid='HomePage'>
      HomePage
      {/*<MyEvents />*/}
      {/*<AllEvents />*/}
    </Page>
  )
}
