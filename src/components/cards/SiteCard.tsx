'use client'

import { useState } from 'react'
import CardManager from './manager/CardManager'
import SiteSelectionFace from './faces/SiteSelectionFace'
import AddSiteFace from './faces/AddSiteFace'

interface Site {
  id: string
  company: string
  currentSite: string
  newSite: string
}

interface SiteCardProps {
  sites: Site[]
  selectedSite: Site
  onSiteChange: (siteId: string) => void
  onAddSite?: (siteData: { company: string; currentSite: string; newSite: string }) => void
}

export default function SiteCard({ 
  sites, 
  selectedSite, 
  onSiteChange, 
  onAddSite 
}: SiteCardProps) {
  const [currentFace, setCurrentFace] = useState('site-selection')

  const handleShowAddForm = () => {
    setCurrentFace('add-site')
  }

  const handleCancelAdd = () => {
    setCurrentFace('site-selection')
  }

  const handleSubmitAdd = (data: { company: string; currentSite: string; newSite: string }) => {
    // Call the parent's onAddSite if provided
    if (onAddSite) {
      onAddSite(data)
    }
    // Return to site selection face
    setCurrentFace('site-selection')
  }

  const faces = [
    {
      id: 'site-selection',
      component: (
        <SiteSelectionFace
          sites={sites}
          selectedSite={selectedSite}
          onSiteChange={onSiteChange}
          onAddSite={handleShowAddForm}
        />
      ),
      className: 'card-front'
    },
    {
      id: 'add-site',
      component: (
        <AddSiteFace
          onSubmit={handleSubmitAdd}
          onCancel={handleCancelAdd}
        />
      ),
      className: 'card-back'
    }
    // Future faces can be added here:
    // {
    //   id: 'edit-site',
    //   component: <EditSiteFace ... />,
    //   className: 'card-edit'
    // }
  ]

  return (
    <CardManager
      faces={faces}
      activeFaceId={currentFace}
      className={currentFace !== 'site-selection' ? 'form-active' : ''}
    />
  )
}
