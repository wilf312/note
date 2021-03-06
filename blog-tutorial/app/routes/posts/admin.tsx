import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, LiveReload, useLoaderData, Outlet } from '@remix-run/react'

import { getPosts } from '~/models/post.server'

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader: LoaderFunction = async () => {
  return json({ posts: await getPosts() })
}

export default function PostAdmin() {
  const { posts } = useLoaderData() as LoaderData

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
      <div className="gap6 grid grid-cols-4">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
          <LiveReload />
          <a href="a"></a>
        </main>
      </div>
    </div>
  )
}
