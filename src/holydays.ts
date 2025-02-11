import { DateTime } from "luxon"
import { ValidationError } from "./error";

type Holyday = {
    date: string,
    name: string
}

function getAllHolydays(): {
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
export function getHolydays(year: number): Holyday[];
/**
 * 指定した年月の祝日を取得する。
 * @param year 
 * @param month 
 * 
 * @returns 祝日の配列
 */
export function getHolydays(year: number, month: number): Holyday[];
/**
 * 指定した年月日の祝日を取得する。
 * @param year 
 * @param month 
 * @param day 
 * 
 * @returns 祝日の配列
 */
export function getHolydays(year: number, month: number, day: number): Holyday[];
export function getHolydays(year: number, month?: number, day?: number): Holyday[] {

    validateCheck(year, month, day);

    const holydaysYear = getAllHolydays().find(holyday => {
        return holyday.year === year
    });

    if (holydaysYear == null) return [];

    if (month == null) {
        return holydaysYear.months.map(holydayMonths => {
            return holydayMonths.days.map(holydays => {
                return createHolydays(year, holydayMonths.month, holydays);
            })
        }).flat();
    }

    if (day == null) {
        return holydaysYear.months.filter(holydayMonths => {
            return holydayMonths.month === month;
        }).map(holydayMonths => {
            return holydayMonths.days.map(holydays => {
                return createHolydays(year, holydayMonths.month, holydays);
            })
        }).flat();
    }

    return holydaysYear.months.find(holydayMonths => {
        return holydayMonths.month === month;
    })!.days.filter(holyday => {
        return holyday.day === day
    }).map(holyday => {
        return createHolydays(year, month, holyday);
    });
}

/**
 * 
 * @param year 
 * @param month 
 * @param days 
 * @returns 
 */
function createHolydays(year: number, month: number, days: { day: number; name: string; }): Holyday {
    return {
        date: formatDate(year, month, days.day),
        name: days.name
    } as Holyday

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

function validateCheck(year: number, month?: number, day?: number): void {

    if (month == null) {
        if (DateTime.fromObject({ year }).isValid === false) throw new ValidationError
    }

    if (day == null) {
        if (DateTime.fromObject({ year, month }).isValid === false) throw new ValidationError
    }

    if (DateTime.fromObject({ year, month, day }).isValid === false) throw new ValidationError
}
