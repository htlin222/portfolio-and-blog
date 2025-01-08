import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: '林協霆',
  description: '的文章集中地',
}

export default function Page() {
  return (
    <div className="max-w-xl lg:max-w-7xl mx-auto">
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">林協霆的文章</h1>
        <BlogPosts />
      </section>
    </div>
  )
}
