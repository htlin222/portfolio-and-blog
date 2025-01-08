'use client'

import { useEffect, useState, useCallback } from 'react'
import './toc.css'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')

  const updateActiveId = useCallback((id: string) => {
    setActiveId((currentId) => {
      if (currentId !== id) return id;
      return currentId;
    });
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1))
      }))
      .filter((heading) => heading.id && heading.text)
    
    setHeadings(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateActiveId(entry.target.id)
          }
        })
      },
      { 
        rootMargin: '0% 0% -80% 0%',
        threshold: 0.1 
      }
    )

    const observedElements = elements.map(({ id }) => document.getElementById(id)).filter(Boolean)
    observedElements.forEach(element => element && observer.observe(element))

    return () => {
      observedElements.forEach(element => element && observer.unobserve(element))
      observer.disconnect()
    }
  }, [updateActiveId])

  if (headings.length === 0) return null

  return (
    <nav className={`${className} w-80 min-w-[320px] hidden lg:block`}>
      <div className="fixed h-screen overflow-auto py-8 pr-8">
        <h4 className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100 px-4">
          On this page
        </h4>
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors"
              style={{ paddingLeft: `${(heading.level - 1) * 1.25}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`toc-link ${activeId === heading.id ? 'active' : ''}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
