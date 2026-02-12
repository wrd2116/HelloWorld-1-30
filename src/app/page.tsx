import { createClient } from '@/lib/supabase/server'

// Change this to any existing table in your Supabase project (e.g. 'todos', 'products', 'countries')
const TABLE_NAME = 'countries'

export default async function Home() {
  const supabase = await createClient()
  const { data: rows, error } = await supabase.from(TABLE_NAME).select('*')

  if (error) {
    return (
      <main className="min-h-screen p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Could not load table
          </h1>
          <p className="text-gray-600 mb-2">
            Table &quot;{TABLE_NAME}&quot;: {error.message}
          </p>
          <p className="text-sm text-gray-500">
            Edit <code className="bg-gray-100 px-1 rounded">TABLE_NAME</code> in{' '}
            <code className="bg-gray-100 px-1 rounded">src/app/page.tsx</code> to
            use an existing table in your project.
          </p>
        </div>
      </main>
    )
  }

  if (!rows?.length) {
    return (
      <main className="min-h-screen p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {TABLE_NAME}
          </h1>
          <p className="text-gray-500">No rows in this table yet.</p>
        </div>
      </main>
    )
  }

  const columns = Object.keys(rows[0] as object)

  return (
    <main className="min-h-screen p-8 md:p-16 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
          {TABLE_NAME.replace(/_/g, ' ')}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {rows.length} row{rows.length !== 1 ? 's' : ''} from Supabase
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, index) => (
            <article
              key={(row as Record<string, unknown>).id ?? index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              {columns.map((key) => {
                const value = (row as Record<string, unknown>)[key]
                const display =
                  value == null
                    ? '—'
                    : typeof value === 'object'
                      ? JSON.stringify(value)
                      : String(value)
                return (
                  <dl key={key} className="mb-3 last:mb-0">
                    <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      {key}
                    </dt>
                    <dd className="text-gray-900 font-medium break-words">
                      {display}
                    </dd>
                  </dl>
                )
              })}
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
