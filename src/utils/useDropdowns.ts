import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCategories, setPriorities, setStatusList, setSubCategories } from '../store/slices/dropdownSlice'
import { getCategories, getPriorities, getStatusList, getSubCategories } from '../services/ticket.service'

/**
 * Loads all ticket dropdown data once and caches it in Redux.
 * Safe to call from multiple components — only fetches if the store is empty.
 */
export const useDropdowns = () => {
    const dispatch = useAppDispatch()
    const { ticketCategories, ticketSubCategories, ticketPriorities, ticketStatusList } = useAppSelector(
        (state) => state.dropdown
    )

    useEffect(() => {
        const load = async () => {
            const [cats, subs, priorities, statusList] = await Promise.all([
                ticketCategories.length === 0 ? getCategories() : Promise.resolve(ticketCategories),
                ticketSubCategories.length === 0 ? getSubCategories() : Promise.resolve(ticketSubCategories),
                ticketPriorities.length === 0 ? getPriorities() : Promise.resolve(ticketPriorities),
                ticketStatusList.length === 0 ? getStatusList() : Promise.resolve(ticketStatusList),
            ])

            if (ticketCategories.length === 0) dispatch(setCategories(cats))
            if (ticketSubCategories.length === 0) dispatch(setSubCategories(subs))
            if (ticketPriorities.length === 0) dispatch(setPriorities(priorities))
            if (ticketStatusList.length === 0) dispatch(setStatusList(statusList))
        }
        load()
    }, [])

    return {
        categories: ticketCategories,
        subCategories: ticketSubCategories,
        priorities: ticketPriorities,
        statusList: ticketStatusList,
    }
}
