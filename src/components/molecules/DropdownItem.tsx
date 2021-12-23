import React from 'react'
import './DropdownItem.css'

type Props = {
  onSelect: any
}

const DropdownItem: React.FC<Props> = ({ onSelect, children }) => (
  <span className="dropdown-item" onClick={onSelect}>
    {children}
  </span>
)

export default DropdownItem
