import React from 'react'
import { FaCaretLeft , FaCaretRight} from 'react-icons/fa'
import { Menu } from 'lucide-react'

const iconTypes = {
  left: FaCaretLeft,
  right: FaCaretRight
}

const IconButton = ({ 
  iconType, 
  onClick, 
  className = "", 
  size = "md",
  type = "button" 
}) => {
  const IconComponent = iconTypes[iconType]

  if (!IconComponent) {
    console.warn(`Icon type "${iconType}" not found`)
    return null
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer transition-colors duration-200 ${className}`}
    >
      <IconComponent className={sizeClasses[size]} />
    </button>
  )
}

export default IconButton