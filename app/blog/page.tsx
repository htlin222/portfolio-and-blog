import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: '林協霆',
  description: '的文章集中地',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">林協霆的文章</h1>
      <BlogPosts />
    </section>
  )
}
