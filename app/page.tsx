import publications from '@/content/publications.json'
import research from '@/content/research.json'
import HomePage from '@/components/HomePage'

export default function Page() {
  return <HomePage publications={publications} research={research} />
}
