import './StatusChip.css'

export interface ChipColorConfig {
  background: string
  color: string
}

export interface StatusChipProps {
  label: string
  colorMap?: Record<string, ChipColorConfig>
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  className?: string
}

const StatusChip = ({ label, colorMap, size = 'md', dot = false, className }: StatusChipProps) => {
  const config = colorMap?.[label]

  const style = config
    ? { backgroundColor: config.background, color: config.color }
    : { backgroundColor: '#f0f0f0', color: '#616161' }

  const sizeClass = size === 'sm' ? 'chip-sm' : size === 'lg' ? 'chip-lg' : ''

  return (
    <span className={`chip ${sizeClass} ${className ?? ''}`} style={style}>
      {dot && <span className="chip-dot" />}
      {label}
    </span>
  )
}

export default StatusChip
