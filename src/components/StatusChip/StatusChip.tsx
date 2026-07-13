import { ChipDot, ChipRoot } from './StatusChip.styles'

export interface ChipColorConfig {
  background: string
  color: string
}

export interface StatusChipProps {
  label: string
  colorMap?: Record<string, ChipColorConfig>
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

const StatusChip = ({ label, colorMap, size = 'md', dot = false }: StatusChipProps) => {
  const config = colorMap?.[label]
  const style = config
    ? { backgroundColor: config.background, color: config.color }
    : { backgroundColor: '#f0f0f0', color: '#616161' }

  return (
    <ChipRoot chipsize={size} style={style}>
      {dot && <ChipDot />}
      {label}
    </ChipRoot>
  )
}

export default StatusChip
