import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The rules for using Xenotree: what you can put in your family tree, and what you can expect from the service.',
  alternates: { canonical: '/terms' },
  openGraph: {
    type: 'article',
    url: 'https://xenotree.vercel.app/terms',
    title: 'Terms of Service | Xenotree',
    description:
      'The rules for using Xenotree: what you can put in your family tree, and what you can expect from the service.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Xenotree',
    description:
      'The rules for using Xenotree: what you can put in your family tree, and what you can expect from the service.',
    images: ['https://xenotree.vercel.app/og.png'],
  },
}

const sections = [
  {
    heading: 'What Xenotree is',
    body: [
      'Xenotree is a family tree application. It lets you record people, the relationships between them, partnerships and life events, and attach photos and documents to the people you add.',
      'It is a personal record-keeping tool. It is not a legal record, not a genealogy service, and not a substitute for professional archival work.',
    ],
  },
  {
    heading: 'Your account',
    body: [
      'You sign in with your own Google account. You are responsible for activity that happens under your account, and for keeping access to your Google account secure.',
      'One account, one person. Creating additional accounts to work around usage limits is not allowed.',
    ],
  },
  {
    heading: 'What you may add',
    body: [
      'You may add any content you have the right to store — your own family records, and photos or documents you have permission to share.',
      'Do not add content that is unlawful, that infringes someone else’s rights, that is hateful or sexually explicit, or that belongs to another person without their consent. We may remove content or close accounts that do this.',
    ],
  },
  {
    heading: 'Your content stays yours',
    body: [
      'You keep ownership of everything you upload. We only store it so the app can show it back to you.',
      'You can export or delete your trees at any time, and you can close your account entirely by emailing us.',
    ],
  },
  {
    heading: 'No warranty',
    body: [
      'The service is provided as-is, without warranty of any kind. It may be unavailable, and features may change or be removed. We are not liable for lost data beyond restoring what our backups hold, or for indirect loss of any kind.',
    ],
  },
  {
    heading: 'Changes',
    body: [
      'These terms can change as the service does. Material changes are reflected in the date at the top of this page.',
    ],
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Terms of Service</h1>
        <p className="mb-12 text-sm text-gray-500">
          Last updated 5 November 2026. Applies to xenotree.vercel.app.
        </p>

        {sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mb-4 leading-relaxed text-gray-600">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">Contact</h2>
          <p className="leading-relaxed text-gray-600">
            Questions about these terms:{' '}
            <a href="mailto:no-reply@xenotree.vercel.app" className="text-blue-600 underline">
              no-reply@xenotree.vercel.app
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
