import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { ProfileCard, type Profile } from '@my/shared'
import './App.css'

type State =
  | { status: 'loading' }
  | { status: 'error'; detail: string }
  | { status: 'ready'; data: Profile }

const API = import.meta.env.VITE_API_URL ?? ''

const delay = (n: number) => ({ '--i': n }) as CSSProperties

const App = () => {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API}/api/profile`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`http ${res.status}`)
        return res.json() as Promise<Profile>
      })
      .then((data) => setState({ status: 'ready', data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({
          status: 'error',
          detail: err instanceof Error ? err.message : 'unknown',
        })
      })
    return () => controller.abort()
  }, [attempt])

  const retry = () => {
    setState({ status: 'loading' })
    setAttempt((a) => a + 1)
  }

  return (
    <div className="layout">
      <main className="term">
        <header className="term-bar">
          <span className="dot" aria-hidden="true" />
          <span className="dot" aria-hidden="true" />
          <span className="dot" aria-hidden="true" />
          <span className="term-title">aman@dev: ~</span>
        </header>
        <div className="term-body">
          {state.status === 'loading' && (
            <p role="status" aria-live="polite">
              <span className="prompt">$ </span>
              <span className="out">connecting to api...</span>
              <span className="cursor" aria-hidden="true">▍</span>
            </p>
          )}

          {state.status === 'error' && (
            <div role="alert">
              <p className="error">
                error: could not reach api, is it running on :4000? ({state.detail})
              </p>
              <button type="button" className="retry" onClick={retry}>
                retry
              </button>
            </div>
          )}

          {state.status === 'ready' && <Output data={state.data} />}
        </div>
      </main>

      {state.status === 'ready' && (
        <aside>
          <ProfileCard
            name={state.data.name}
            role={state.data.role}
            github={state.data.links.find((l) => l.label === 'github')?.url}
          />
        </aside>
      )}
    </div>
  )
}

const Output = ({ data }: { data: Profile }) => (
  <>
    <section className="section line" style={delay(0)}>
      <p><span className="prompt">$ </span><span className="cmd">whoami</span></p>
      <p className="out"><strong>{data.name}</strong> - {data.role}</p>
      <p className="out">{data.location}</p>
      <p className="out">{data.bio}</p>
    </section>

    <section className="section line" style={delay(1)}>
      <p><span className="prompt">$ </span><span className="cmd">ls skills</span></p>
      <p className="out">{data.skills.join('  ')}</p>
    </section>

    <section className="section line" style={delay(2)}>
      <p><span className="prompt">$ </span><span className="cmd">cat projects.json</span></p>
      <ul className="projects out">
        {data.projects.map((p) => (
          <li key={p.name}>
            <span className="accent">{p.name}</span>{' '}
            <span className={`tag-${p.status}`}>[{p.status}]</span>
            <br />
            {p.description}
            <br />
            stack: {p.stack.join(', ')}
          </li>
        ))}
      </ul>
    </section>

    <section className="section line" style={delay(3)}>
      <p><span className="prompt">$ </span><span className="cmd">cat links.txt</span></p>
      <ul className="projects out">
        {data.links.map((l) => (
          <li key={l.label}>
            {l.label}:{' '}
            <a href={l.url} target="_blank" rel="noreferrer">{l.url}</a>
          </li>
        ))}
      </ul>
    </section>

    <p className="line" style={delay(4)} aria-hidden="true">
      <span className="prompt">$ </span>
      <span className="cursor">▍</span>
    </p>
  </>
)

export default App