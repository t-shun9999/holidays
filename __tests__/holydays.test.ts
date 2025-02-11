import { getHolydays } from '#/holydays';

/**
 * holydaysテストモジュール
 */
describe('getHolydays', () => {

    /**
     * 
     */
    test('指定年の祝日がすべて取得できること', () => {
        const result = getHolydays(2025);

        expect(result.length).toBe(15);
        expect(result[0]).toEqual({ date: '2025/01/01', name: '元旦' })
        expect(result[1]).toEqual({ date: '2025/01/13', name: '成人の日' })
        expect(result[2]).toEqual({ date: '2025/02/11', name: '建国記念の日' })
        expect(result[3]).toEqual({ date: '2025/02/24', name: '天皇誕生日（振替）' })
        expect(result[4]).toEqual({ date: '2025/03/20', name: '春分の日' })
        expect(result[5]).toEqual({ date: '2025/04/29', name: '昭和の日' })
        expect(result[6]).toEqual({ date: '2025/05/05', name: 'こどもの日' })
        expect(result[7]).toEqual({ date: '2025/05/06', name: 'みどりの日（振替）' })
        expect(result[8]).toEqual({ date: '2025/07/21', name: '海の日' })
        expect(result[9]).toEqual({ date: '2025/08/11', name: '山の日' })
        expect(result[10]).toEqual({ date: '2025/09/15', name: '敬老の日' })
        expect(result[11]).toEqual({ date: '2025/09/23', name: '秋分の日' })
        expect(result[12]).toEqual({ date: '2025/10/13', name: 'スポーツの日' })
        expect(result[13]).toEqual({ date: '2025/11/03', name: '文化の日' })
        expect(result[14]).toEqual({ date: '2025/11/24', name: '勤労感謝の日（振替）' })
    });

    /**
     * 
     */
    test('指定年月の祝日がすべて取得できること', () => {
        const result = getHolydays(2025, 1);

        expect(result.length).toBe(2);
        expect(result[0]).toEqual({ date: '2025/01/01', name: '元旦' })
        expect(result[1]).toEqual({ date: '2025/01/13', name: '成人の日' })
    });

    /**
     * 
     */
    test('指定年月日の祝日が取得できること', () => {
        const result = getHolydays(2025, 1, 13);

        expect(result.length).toBe(1);
        expect(result[0]).toEqual({ date: '2025/01/13', name: '成人の日' })
    });

    /**
     * 
     */
    test('指定した年に祝日が存在しない場合、空配列が取得されること', () => {
        const result = getHolydays(2024);

        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    /**
     * 
     */
    test('指定した年月に祝日が存在しない場合、空配列が取得されること', () => {
        const result = getHolydays(2024, 6);

        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });
});
