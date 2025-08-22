'use client'

interface Site {
  id: string
  company: string
  currentSite: string
  newSite: string
}

interface SiteSelectionFaceProps {
  sites: Site[]
  selectedSite: Site
  onSiteChange: (siteId: string) => void
  onAddSite: () => void
}

export default function SiteSelectionFace({ 
  sites, 
  selectedSite, 
  onSiteChange, 
  onAddSite 
}: SiteSelectionFaceProps) {
  const handleSiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSiteChange(e.target.value)
  }

  return (
    <div className="site-selection">
      <div className="site-select-row">
        <select 
          id="site-select" 
          className="select-field"
          value={selectedSite.id}
          onChange={handleSiteChange}
        >
          {sites.map(site => (
            <option key={site.id} value={site.id}>
              {site.company} - Current: {site.currentSite} → New: {site.newSite}
            </option>
          ))}
        </select>
        <button className="btn-secondary plus-btn" onClick={onAddSite} title="Add New Site">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="site-details">
        <div className="detail-row">
          <span className="detail-label">Company:</span>
          <span className="detail-value">{selectedSite.company}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Current Site:</span>
          <span className="detail-value">{selectedSite.currentSite}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">New Site:</span>
          <span className="detail-value">{selectedSite.newSite}</span>
        </div>
      </div>
    </div>
  )
}
