import { TreePoseIllustration } from '@/components/illustrations/TreePoseIllustration'
import Link from 'next/link'

export default function IllustrationTestPage() {
  return (
    <div className="min-h-screen bg-slate-medical">
      <header className="bg-slate-medical border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-heading font-bold text-charcoal">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-heading font-bold text-charcoal text-center mb-4">
          Accucentral Illustration Style Test
        </h1>
        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Sample branded SVG illustration using Navy/Gold/Coral palette
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Large preview */}
          <div className="bg-white rounded-xl border-2 border-slate-200 p-8">
            <h2 className="text-2xl font-heading font-semibold text-charcoal mb-4">
              Full Size Preview
            </h2>
            <div className="w-full aspect-2/3 bg-slate-medical-200 rounded-lg overflow-hidden">
              <TreePoseIllustration />
            </div>
          </div>

          {/* Card preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h2 className="text-2xl font-heading font-semibold text-charcoal mb-4">
                In Pose Card
              </h2>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="relative aspect-4/3 bg-slate-medical-200">
                  <TreePoseIllustration />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-heading font-semibold text-charcoal mb-1">
                    Tree Pose
                  </h3>
                  <p className="text-sm text-slate-500 italic mb-3">Vrksasana</p>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span>Balancing</span>
                    <span>•</span>
                    <span>5-10 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Design notes */}
            <div className="bg-white rounded-xl border-2 border-calm-blue-200 p-6">
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-4">
                Design Characteristics
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-sage-green-300 mt-1">→</span>
                  <span><strong>Navy gradients</strong> for body/figure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-green-300 mt-1">→</span>
                  <span><strong>Sage-Green-to-Warm-Coral accent</strong> for energy/flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-green-300 mt-1">→</span>
                  <span><strong>Medical Slate background</strong> for clinical feel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-green-300 mt-1">→</span>
                  <span><strong>Minimal geometric shapes</strong> - not cartoonish</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-green-300 mt-1">→</span>
                  <span><strong>Soft edges</strong> with rounded caps for calm aesthetic</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional examples */}
        <div className="mt-12 max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-charcoal mb-6 text-center">
            Small Grid Preview (as would appear on homepage)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-4/3 bg-slate-medical-200">
                  <TreePoseIllustration />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-heading font-semibold text-charcoal">
                    Tree Pose
                  </h3>
                  <p className="text-xs text-slate-500 italic">Vrksasana</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
