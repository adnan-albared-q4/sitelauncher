'use client'

interface AddSiteFaceProps {
  onSubmit: (data: { company: string; currentSite: string; newSite: string }) => void
  onCancel: () => void
}

export default function AddSiteFace({ onSubmit, onCancel }: AddSiteFaceProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      company: formData.get('company') as string,
      currentSite: formData.get('currentSite') as string,
      newSite: formData.get('newSite') as string,
    }
    onSubmit(data)
  }

  return (
    <div className="add-site-form">
      <div className="form-header">
        <button type="button" className="btn-secondary" onClick={() => {
          // Trigger form submission by getting form data
          const form = document.querySelector('.add-site-form form') as HTMLFormElement
          if (form) {
            const formData = new FormData(form)
            const data = {
              company: formData.get('company') as string,
              currentSite: formData.get('currentSite') as string,
              newSite: formData.get('newSite') as string,
            }
            onSubmit(data)
          }
        }}>
          Add New Site
        </button>
        <button className="btn-secondary exit-btn" onClick={onCancel} title="Exit Form">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="company"
            type="text"
            className="input-field"
            placeholder="company name"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="currentSite"
            type="url"
            className="input-field"
            placeholder="https://oldsite.com"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="newSite"
            type="url"
            className="input-field"
            placeholder="https://newsite.com"
            required
          />
        </div>
      </form>
    </div>
  )
}
