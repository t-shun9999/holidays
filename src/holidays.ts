import { DateTime } from "luxon"
import { ValidationError } from "./error";
import { validateCheck } from "./util/date";

type Holiday = {
    date: string,
    name: string
}

function getAllHolidays(): {
    year: number;
    months: {
        month: number;
        days: {
            day: number;
            name: string;
        }[];
    }[];
}[] {
    return [
        {
            year: 2025,
            months: [
                {
                    month: 1,
                    days: [
                        { day: 1, name: '元旦' },
                        { day: 13, name: '成人の日' },
                    ]
                },
                {
                    month: 2,
                    days: [
                        { day: 11, name: '建国記念の日' },
                        { day: 24, name: '天皇誕生日（振替）' },
                    ]
                },
                {
                    month: 3,
                    days: [
                        { day: 20, name: '春分の日' },
                    ]
                },
                {
                    month: 4,
                    days: [
                        { day: 29, name: '昭和の日' },
                    ]
                },
                {
                    month: 5,
                    days: [
                        { day: 5, name: 'こどもの日' },
                        { day: 6, name: 'みどりの日（振替）' },
                    ]
                },
                {
                    month: 7,
                    days: [
                        { day: 21, name: '海の日' },
                    ]
                },
                {
                    month: 8,
                    days: [
                        { day: 11, name: '山の日' },
                    ]
                },
                {
                    month: 9,
                    days: [
                        { day: 15, name: '敬老の日' },
                        { day: 23, name: '秋分の日' },
                    ]
                },
                {
                    month: 10,
                    days: [
                        { day: 13, name: 'スポーツの日' },
                    ]
                },
                {
                    month: 11,
                    days: [
                        { day: 3, name: '文化の日' },
                        { day: 24, name: '勤労感謝の日（振替）' },
                    ]
                },
            ]
        }
    ]
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

    validateCheck(year, month, day);

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
 * @param days 
 * @returns 
 */
function createHolidays(year: number, month: number, days: { day: number; name: string; }): Holiday {
    return {
        date: formatDate(year, month, days.day),
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
function formatDate(year: number, month: number, day: number): string {
    return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
}
