import axios from 'axios';
import { Holiday } from '../types/Holiday';

const BASE_URL = 'http://localhost:3000/api';

export class HolidayService {
  /**
   * 指定した年の全祝日を取得
   */
  static async getHolidaysByYear(year: number): Promise<Holiday[]> {
    try {
      const response = await axios.get<Holiday[]>(`${BASE_URL}/holidays/${year}`);
      return response.data;
    } catch (error) {
      throw new Error(`祝日の取得に失敗しました: ${error}`);
    }
  }

  /**
   * 指定した年月の祝日を取得
   */
  static async getHolidaysByYearMonth(year: number, month: number): Promise<Holiday[]> {
    try {
      const response = await axios.get<Holiday[]>(`${BASE_URL}/holidays/${year}/${month}`);
      return response.data;
    } catch (error) {
      throw new Error(`祝日の取得に失敗しました: ${error}`);
    }
  }

  /**
   * 指定した年月日の祝日を取得
   */
  static async getHolidaysByYearMonthDay(year: number, month: number, day: number): Promise<Holiday[]> {
    try {
      const response = await axios.get<Holiday[]>(`${BASE_URL}/holidays/${year}/${month}/${day}`);
      return response.data;
    } catch (error) {
      throw new Error(`祝日の取得に失敗しました: ${error}`);
    }
  }
}
