import type { ChipColorConfig } from './StatusChip'
import { colors } from '../../config/colors'

export const TICKET_STATUS_COLORS: Record<string, ChipColorConfig> = {
    'New':               { background: colors.teal.bg,         color: colors.teal.text },
    'Assigned':          { background: colors.brand.bg,        color: colors.brand.text },
    'In Progress':       { background: colors.info.bg,         color: colors.info.text },
    'Pending Customer':  { background: colors.orange.bg,       color: colors.orange.text },
    'Resolved':          { background: colors.successLight.bg, color: colors.successLight.text },
    'Closed':            { background: colors.neutral.bg,      color: colors.neutral.text },
    'Reopened':          { background: colors.warning.bg,      color: colors.warning.text },
    'Cancelled':         { background: colors.errorStrong.bg,  color: colors.errorStrong.text },
}

export const TICKET_PRIORITY_COLORS: Record<string, ChipColorConfig> = {
    'Low':      { background: colors.info.bg,    color: colors.info.text },
    'Medium':   { background: colors.warning.bg, color: colors.warning.text },
    'High':     { background: colors.error.bg,   color: colors.error.text },
    'Critical': { background: colors.purple.bg,  color: colors.purple.text },
}
