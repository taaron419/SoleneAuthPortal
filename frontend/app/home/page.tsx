import { BrandMark } from '@/components/brand-mark'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center gap-2 px-6 py-5 text-primary">
        <BrandMark className="size-5" />
        <span className="font-serif text-sm font-medium">Solene</span>
      </header>
    </main>
  )
}
