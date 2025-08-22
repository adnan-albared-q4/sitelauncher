'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SiteCard from '../../components/cards/SiteCard'
import './dashboard.css'

export default function DashboardPage() {
  const router = useRouter()
  
  // Site data
  const sites = [
    {
      id: 'site1',
      company: 'Acme Corp',
      currentSite: 'acme.com',
      newSite: 'newacme.com'
    },
    {
      id: 'site2', 
      company: 'TechStart',
      currentSite: 'techstart.io',
      newSite: 'techstart.com'
    },
    {
      id: 'site3',
      company: 'GlobalBiz',
      currentSite: 'globalbiz.net',
      newSite: 'globalbiz.com'
    }
  ]

  // State for selected site
  const [selectedSite, setSelectedSite] = useState(sites[0])

  const handleLogout = () => {
    router.push('/')
  }

  const handleSiteChange = (siteId: string) => {
    const site = sites.find(s => s.id === siteId)
    if (site) {
      setSelectedSite(site)
    }
  }

  const handleAddSite = (siteData: { company: string; currentSite: string; newSite: string }) => {
    // Here you would typically add the new site to your sites array
    console.log('Adding new site:', siteData)
    // For now, just log the data
  }

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="top-nav-content">
          <div className="top-nav-left">
            <div className="logo-section">
              <h1>Orchestrator</h1>
              <img src="/logo-white.svg" alt="Orchestrator Icon" style={{ width: '120px'}} />
            </div>
          </div>
          <div className="top-nav-right">
            <div className="welcome-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
              <span>welcome, Admin</span>
            </div>
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Control Panel - 1/3 width */}
        <div className="left-panel">

          {/* Top Section - Site Selection */}
          <SiteCard
            sites={sites}
            selectedSite={selectedSite}
            onSiteChange={handleSiteChange}
            onAddSite={handleAddSite}
          />

          {/* Middle Section - Decisions & Alerts (Empty for now) */}
          <div className="control-section decisions-section">
            <h3>Decisions & Alerts</h3>
            <div style={{textAlign: 'center', color: 'var(--brand-text-secondary)', marginTop: '32px'}}>
              This area will contain various decisions, alerts, and choices for the user to click.
            </div>
          </div>

          {/* Bottom Section - Activity Log */}
          <div className="control-section activity-log-section">
            <h3>Activity Log</h3>
            <div style={{textAlign: 'center', color: 'var(--brand-text-secondary)', marginTop: '32px'}}>
              This area will show a log of what's happening during automation.
            </div>
          </div>
        </div>

        {/* Right Automation Display Area - 2/3 width */}
        <div className="right-panel">
          <div className="automation-area">
            <div className="automation-placeholder">
              <h3>Automation Display Area</h3>
              <p>This area will show pages that Playwright is automating through.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 