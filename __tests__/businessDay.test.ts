import { ValidationError } from '#/error';
import { isBusinessDay } from '#/businessDay';

/**
 * holydaysテストモジュール
 */
describe('isBusinessDay', () => {

    /**
     * 
     */
    test('指定した年月日が月曜日の場合、営業日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 6);

        expect(result).toBe(true);
    });

    /**
     * 
     */
    test('指定した年月日が火曜日の場合、営業日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 7);

        expect(result).toBe(true);
    });

    /**
     * 
     */
    test('指定した年月日が水曜日の場合、営業日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 8);

        expect(result).toBe(true);
    });

    /**
     * 
     */
    test('指定した年月日が木曜日の場合、営業日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 9);

        expect(result).toBe(true);
    });

    /**
     * 
     */
    test('指定した年月日が金曜日の場合、営業日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 10);

        expect(result).toBe(true);
    });

    /**
     * 
     */
    test('指定した年月日が土曜日の場合、休日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 11);

        expect(result).toBe(false);
    });

    /**
     * 
     */
    test('指定した年月日が日曜日の場合、休日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 12);

        expect(result).toBe(false);
    });

    /**
     * 
     */
    test('指定した年月日が月曜日、かつ、祝日の場合、休日と判定されること', () => {
        const result = isBusinessDay(2025, 1, 13);

        expect(result).toBe(false);
    });

    /**
     * 
     */
    test('指定した年月日が土曜日、かつ、祝日の場合、休日と判定されること', () => {
        const result = isBusinessDay(2025, 5, 3);

        expect(result).toBe(false);
    });

    /**
     * 
     */
    test('不正な年月日を指定した場合、ValidationErrorがThrowされること', () => {
        expect(() => isBusinessDay(2024, 2, 30)).toThrow(new ValidationError())
    });
});
