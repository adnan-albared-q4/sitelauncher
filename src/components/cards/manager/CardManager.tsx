'use client'

import React, { ReactNode } from 'react'

interface CardFace {
  id: string
  component: ReactNode
  className?: string
}

interface CardManagerProps {
  faces: CardFace[]
  activeFaceId: string
  className?: string
  cardDirection?: 'rotateY' | 'rotateX' | 'rotateZ'
  rotationDegrees?: number
}

export default function CardManager({ 
  faces, 
  activeFaceId, 
  className = '',
  cardDirection = 'rotateY',
  rotationDegrees = 180
}: CardManagerProps) {
  const activeFaceIndex = faces.findIndex(face => face.id === activeFaceId)
  const rotation = activeFaceIndex * rotationDegrees

  return (
    <div className={`control-section ${className}`}>
      <div 
        className="control-section-inner"
        style={{
          transform: `${cardDirection}(${rotation}deg)`
        }}
      >
        {faces.map((face, index) => (
          <div 
            key={face.id}
            className={`card-face ${face.className || ''}`}
            style={{
              transform: `${cardDirection}(${index * rotationDegrees}deg)`
            }}
          >
            {face.component}
          </div>
        ))}
      </div>
    </div>
  )
}
