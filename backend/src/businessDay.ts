import { isHoliday } from "#/holidays";
import { validateDate } from "#/util/date";
import { DaysOfWeek } from "#/const/daysOfWeek";

/**
 * 
 * @param year 
 * @param month 
 * @param day 
 * @returns 
 */
export function isBusinessDay(year: number, month: number, day: number): boolean {

    validateDate(year, month, day);

    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek !== DaysOfWeek.Sunday && dayOfWeek !== DaysOfWeek.Saturday && isHoliday(year, month, day) === false;
}
