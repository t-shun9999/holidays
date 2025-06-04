import { validateDate } from "#/util/date";
import { getAllHolidays } from "#/repository/holidaysRepository";

type Holiday = {
    date: string,
    name: string
}

/**
 * 指定した年の祝日を取得する。
 * @param year 
 * 
 * @returns 祝日の配列
 */
export function getHolidays(year: number): Holiday[];
/**
 * 指定した年月の祝日を取得する。
 * @param year 
 * @param month 
 * 
 * @returns 祝日の配列
 */
export function getHolidays(year: number, month: number): Holiday[];
/**
 * 指定した年月日の祝日を取得する。
 * @param year 
 * @param month 
 * @param day 
 * 
 * @returns 祝日の配列
 */
export function getHolidays(year: number, month: number, day: number): Holiday[];
export function getHolidays(year: number, month?: number, day?: number): Holiday[] {

    validateDate(year, month, day);

    const holidaysYear = getAllHolidays().find(holiday => {
        return holiday.year === year
    });

    if (holidaysYear == null) return [];

    if (month == null) {
        return holidaysYear.months.map(holidayMonths => {
            return holidayMonths.days.map(holidays => {
                return createHolidays(year, holidayMonths.month, holidays);
            })
        }).flat();
    }

    if (day == null) {
        return holidaysYear.months.filter(holidayMonths => {
            return holidayMonths.month === month;
        }).map(holidayMonths => {
            return holidayMonths.days.map(holidays => {
                return createHolidays(year, holidayMonths.month, holidays);
            })
        }).flat();
    }

    return holidaysYear.months.find(holidayMonths => {
        return holidayMonths.month === month;
    })!.days.filter(holiday => {
        return holiday.day === day
    }).map(holiday => {
        return createHolidays(year, month, holiday);
    });
}

/**
 * 
 * @param year 
 * @param month 
 * @param day 
 * @returns 
 */
export function isHoliday(year: number, month: number, day: number): boolean {
    return getHolidays(year, month, day).length > 0;
}

/**
 * 
 * @param year 
 * @param month 
 * @param days 
 * @returns 
 */
function createHolidays(year: number, month: number, days: { day: number; name: string; }): Holiday {
    return {
        date: formatYYYYMMDD(year, month, days.day),
        name: days.name
    } as Holiday
}

/**
 * 
 * @param year 
 * @param month 
 * @param day 
 * @returns 
 */
function formatYYYYMMDD(year: number, month: number, day: number): string {
    return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
}
