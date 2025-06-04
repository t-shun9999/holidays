import React, { useState } from 'react';
import { Holiday } from '../types/Holiday';
import { HolidayService } from '../services/HolidayService';

const HolidaySearch: React.FC = () => {
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const currentYear = new Date().getFullYear();

  const handleSearch = async () => {
    if (!year) {
      setError('年を入力してください');
      return;
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1000 || yearNum > 9999) {
      setError('有効な年を入力してください（1000-9999）');
      return;
    }

    setLoading(true);
    setError('');
    setHolidays([]);

    try {
      let result: Holiday[];

      if (day && month) {
        // 年月日検索
        const monthNum = parseInt(month);
        const dayNum = parseInt(day);
        
        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
          throw new Error('有効な月を入力してください（1-12）');
        }
        if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
          throw new Error('有効な日を入力してください（1-31）');
        }

        result = await HolidayService.getHolidaysByYearMonthDay(yearNum, monthNum, dayNum);
      } else if (month) {
        // 年月検索
        const monthNum = parseInt(month);
        
        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
          throw new Error('有効な月を入力してください（1-12）');
        }

        result = await HolidayService.getHolidaysByYearMonth(yearNum, monthNum);
      } else {
        // 年検索
        result = await HolidayService.getHolidaysByYear(yearNum);
      }

      setHolidays(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setYear('');
    setMonth('');
    setDay('');
    setHolidays([]);
    setError('');
  };

  const getSearchDescription = () => {
    if (day && month) {
      return `${year}年${month}月${day}日の祝日`;
    } else if (month) {
      return `${year}年${month}月の祝日`;
    } else {
      return `${year}年の祝日`;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="holiday-search">
      <form className="search-form" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="form-group">
          <label htmlFor="year">年</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={`例: ${currentYear}`}
            min="1000"
            max="9999"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="month">月（任意）</label>
          <input
            id="month"
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="例: 1"
            min="1"
            max="12"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="day">日（任意）</label>
          <input
            id="day"
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="例: 1"
            min="1"
            max="31"
            disabled={!month}
          />
        </div>
        
        <button
          type="submit"
          className="search-button"
          disabled={loading || !year}
        >
          {loading ? '検索中...' : '検索'}
        </button>
        
        <button
          type="button"
          className="clear-button"
          onClick={handleClear}
          disabled={loading}
        >
          クリア
        </button>
      </form>

      {loading && <div className="loading">祝日を検索しています...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {holidays.length > 0 && (
        <div className="results">
          <h2>{getSearchDescription()}（{holidays.length}件）</h2>
          <div className="holiday-list">
            {holidays.map((holiday, index) => (
              <div key={index} className="holiday-item">
                <div className="holiday-date">{formatDate(holiday.date)}</div>
                <div className="holiday-name">{holiday.name}</div>
                <div className="holiday-type">{holiday.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!loading && !error && holidays.length === 0 && (year || month || day) && (
        <div className="no-results">
          指定した条件の祝日は見つかりませんでした。
        </div>
      )}
    </div>
  );
};

export default HolidaySearch;
