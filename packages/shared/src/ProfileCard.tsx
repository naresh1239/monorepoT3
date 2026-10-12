import './ProfileCard.css'

export interface ProfileCardProps {
  name: string
  role: string
  github?: string
}

export const ProfileCard = ({ name, role, github }: ProfileCardProps) => (
  <section className="pcard">
    <header className="pcard-bar">
      <span className="pcard-dot" aria-hidden="true" />
      <span className="pcard-dot" aria-hidden="true" />
      <span className="pcard-dot" aria-hidden="true" />
      <span className="pcard-title">profile</span>
    </header>
    <div className="pcard-body">
      <p><span className="pcard-prompt">$ </span><span className="pcard-cmd">whoami</span></p>
      <p className="pcard-out"><strong>{name}</strong></p>

      <p><span className="pcard-prompt">$ </span><span className="pcard-cmd">cat role</span></p>
      <p className="pcard-out">{role}</p>

      {github && (
        <>
          <p><span className="pcard-prompt">$ </span><span className="pcard-cmd">open github</span></p>
          <p className="pcard-out">
            <a href={github} target="_blank" rel="noreferrer">
              {github.replace('https://', '')}
            </a>
          </p>
        </>
      )}
    </div>
  </section>
)