import { getHolydays } from "./holydays";
import { validateCheck } from "./util/date";

/**
 * 
 * @param year 
 * @param month 
 * @param day 
 * @returns 
 */
export function isBusinessDay(year: number, month: number, day: number): boolean {

    validateCheck(year, month, day);

    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6 && getHolydays(year, month, day).length === 0;
}
