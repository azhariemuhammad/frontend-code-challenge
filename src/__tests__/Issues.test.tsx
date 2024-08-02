import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Issues } from '../pages/Issues'
import { issues } from '../__mocks__/issuesMock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('@tanstack/react-query', async importOriginal => {
  const original = await importOriginal()
  return {
    ...original,
    useQuery: vi.fn(() => issues),
  }
})

// mock issueComposer
vi.mock('../components/IssueComposer', () => ({
  IssueComposer: () => <div>IssueComposer</div>,
}))

// @ts-ignore
window.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('IssuePage', () => {
  const queryClient = new QueryClient()

  it('renders the past issues', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Issues />
      </QueryClientProvider>,
    )

    expect(await screen.findByText('Past Issues')).toBeInTheDocument()
    expect(await screen.findByText('Issue 1')).toBeInTheDocument()
    expect(screen.getByText('Issue 2')).toBeInTheDocument()
  })
})
