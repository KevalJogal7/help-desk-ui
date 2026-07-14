import type { DropdownOption, SubCategory } from "./ticket";

export interface DropdownSlice {
    ticketPriorities: DropdownOption[];
    ticketStatusList: DropdownOption[]; 
    ticketCategories: DropdownOption[]; 
    ticketSubCategories: SubCategory[]; 
}