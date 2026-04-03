import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { buttonClassName } from '../components/ui/Button'
import { EmptyState, LoadingState } from '../components/ui/States'
import BrandMark from '../components/layout/BrandMark'

export default function ShareView() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return (
      <div className="app-shell grid min-h-screen items-center py-8">
        <EmptyState title="No shared thread found" copy="This route expects a share slug. Without one, there is no reading to display." />
      </div>
    )
  }

  if (slug === 'loading') {
    return (
      <div className="app-shell grid min-h-screen items-center py-8">
        <LoadingState title="Opening shared reading" copy="Preparing a private reading view with the same contemplative visual language." />
      </div>
    )
  }

  return (
    <div className="app-shell grid min-h-screen items-center py-8 sm:py-12">
      <Card strong className="mx-auto w-full max-w-3xl p-7 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-label">Shared reading</p>
            <h1 className="mt-2 font-serif text-4xl leading-tight text-ivory sm:text-5xl">A private thread, opened with intention</h1>
          </div>
          <BrandMark className="h-12 w-12" />
        </div>

        <div className="mt-8 grid gap-4">
          <div className="folio-panel p-5">
            <p className="section-label">Reference</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ochre/72">{slug}</p>
          </div>
          <div className="folio-panel p-5">
            <p className="font-serif text-[1.95rem] leading-8 text-ivory">
              This shared reading view preserves the same restrained material language as the rest of the platform, so privacy, authorship, and meaning stay visually coherent.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/auth" className={buttonClassName('primary')}>Start your own reading</Link>
          <Link to="/" className={buttonClassName('secondary')}>Return to landing</Link>
        </div>
      </Card>
    </div>
  )
}
