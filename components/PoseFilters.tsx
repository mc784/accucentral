'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

interface PoseFiltersProps {
  currentParams: {
    category?: string
    difficulty?: string
    search?: string
  }
  totalCount: number
}

const categories = [
  { value: 'standing', label: 'Standing' },
  { value: 'seated', label: 'Seated' },
  { value: 'backbends', label: 'Backbends' },
  { value: 'forward-bends', label: 'Forward Bends' },
  { value: 'twists', label: 'Twists' },
  { value: 'inversions', label: 'Inversions' },
  { value: 'arm-balances', label: 'Arm Balances' },
  { value: 'hip-openers', label: 'Hip Openers' },
  { value: 'core', label: 'Core' },
  { value: 'restorative', label: 'Restorative' },
  { value: 'balancing', label: 'Balance' },
]

const difficulties = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export function PoseFilters({ currentParams, totalCount }: PoseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchInput, setSearchInput] = useState(currentParams.search || '')

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    startTransition(() => {
      router.push(`/poses?${params.toString()}`)
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters('search', searchInput)
  }

  const clearFilters = () => {
    setSearchInput('')
    startTransition(() => {
      router.push('/poses')
    })
  }

  const hasFilters = currentParams.category || currentParams.difficulty || currentParams.search

  return (
    <section className="bg-slate-medical border-b border-slate-200">
      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search poses (e.g., 'Warrior' or 'Virabhadrasana')..."
              className="w-full px-4 py-3 pl-12 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-transparent text-slate-700 bg-white"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="text-sm font-medium text-navy-500">Filter by:</div>

          {/* Category Filter */}
          <select
            value={currentParams.category || ''}
            onChange={(e) => updateFilters('category', e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-transparent text-slate-700 bg-white"
            disabled={isPending}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={currentParams.difficulty || ''}
            onChange={(e) => updateFilters('difficulty', e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-transparent text-slate-700 bg-white"
            disabled={isPending}
          >
            <option value="">All Levels</option>
            {difficulties.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-coral hover:text-coral-500 underline font-medium"
              disabled={isPending}
            >
              Clear filters
            </button>
          )}

          {/* Results Count */}
          <div className="ml-auto text-sm text-slate-600">
            {totalCount} {totalCount === 1 ? 'pose' : 'poses'} found
          </div>
        </div>
      </div>
    </section>
  )
}
