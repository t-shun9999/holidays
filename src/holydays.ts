type Holyday = {
    date: string,
    name: string
}

const ALL_HOLYDAYS = [
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

export function getHolydays(
    year: number,
): Holyday[] {

    const holydaysYear = ALL_HOLYDAYS.find(holyday => {
        return holyday.year === year
    });

    return holydaysYear!.months.map(holydayMonths => {
        return holydayMonths.days.map(holydays => {
            return {
                date: `${year}/${holydayMonths.month.toString().padStart(2, '0')}/${holydays.day.toString().padStart(2, '0')}`,
                name: holydays.name
            } as Holyday
        })
    }).flat();
}
