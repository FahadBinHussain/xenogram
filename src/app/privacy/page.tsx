import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Xenotree handles your account, your family tree data, and the photos and documents you attach.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'article',
    url: 'https://xenotree.vercel.app/privacy',
    title: 'Privacy Policy | Xenotree',
    description:
      'How Xenotree handles your account, your family tree data, and the photos and documents you attach.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Xenotree',
    description:
      'How Xenotree handles your account, your family tree data, and the photos and documents you attach.',
    images: ['https://xenotree.vercel.app/og.png'],
  },
}

const sections = [
  {
    heading: 'What we collect',
    body: [
      'When you sign in with Google we receive your Google account email address, your display name, and your profile picture URL. We store these against your user record so we can recognise you on later visits.',
      'Your family tree data — the trees you create, the members you add, their relationships, partnerships and life events — is stored so the app can show it back to you. Any photo or document you attach to a member is stored alongside that member.',
      'We also record the standard web server logs needed to keep the site running and to investigate abuse.',
    ],
  },
  {
    heading: 'Where it is stored',
    body: [
      'The application database runs on Neon, in the Singapore region (ap-southeast-1). Your tree data and attachments are stored there. Nothing is sent to a third-party analytics service.',
    ],
  },
  {
    heading: 'What we do not do',
    body: [
      'We do not sell your data, share it with advertisers, or use it to train models. We do not run third-party tracking or advertising cookies on this site.',
    ],
  },
  {
    heading: 'Your data, your call',
    body: [
      'You can edit or delete anything you add to a tree. Deleting your account removes your user record and, with it, the trees you own.',
      'If you want your data removed and want to be sure it is gone, email the address below and we will action the deletion from the database directly.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'The app sets one session cookie so you stay signed in between visits. It contains only an opaque session identifier and nothing else.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Privacy Policy</h1>
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
            Questions or deletion requests:{' '}
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
