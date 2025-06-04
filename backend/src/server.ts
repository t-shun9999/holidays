import express from 'express';
import cors from 'cors';
import { getHolidays } from '#/holidays';

const app = express();
const port = 3000;

// CORS設定
app.use(cors({
    origin: 'http://localhost:3001', // フロントエンドのURL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// JSONミドルウェアを設定
app.use(express.json());

/**
 * 共通のエラーハンドリング関数
 */
const handleError = (res: express.Response, error: unknown) => {
    console.error('Error fetching holidays:', error);
    res.status(500).json({
        error: 'Failed to fetch holidays',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
};

/**
 * パラメータを数値に変換（不正な入力の場合はエラー）
 */
const parseParam = (param: string, paramName: string): number => {
    const value = parseInt(param);
    if (isNaN(value)) {
        throw new Error(`Invalid ${paramName} parameter. Must be a number.`);
    }
    return value;
};

/**
 * 指定した年の全祝日を取得
 */
app.get('/api/holidays/:year', (req, res) => {
    try {
        const year = parseParam(req.params.year, 'year');
        const holidays = getHolidays(year);
        res.json(holidays);
    } catch (error) {
        handleError(res, error);
    }
});

/**
 * 指定した年月の祝日を取得
 */
app.get('/api/holidays/:year/:month', (req, res) => {
    try {
        const year = parseParam(req.params.year, 'year');
        const month = parseParam(req.params.month, 'month');
        const holidays = getHolidays(year, month);
        res.json(holidays);
    } catch (error) {
        handleError(res, error);
    }
});

/**
 * 指定した年月日の祝日を取得
 */
app.get('/api/holidays/:year/:month/:day', (req, res) => {
    try {
        const year = parseParam(req.params.year, 'year');
        const month = parseParam(req.params.month, 'month');
        const day = parseParam(req.params.day, 'day');
        const holidays = getHolidays(year, month, day);
        res.json(holidays);
    } catch (error) {
        handleError(res, error);
    }
});

/**
 * ルートパスへのアクセス時のリダイレクト
 */
app.get('/api/holidays', (_req, res) => {
    res.status(400).json({
        error: 'Missing parameters',
        message: 'Please use /api/holidays/:year, /api/holidays/:year/:month, or /api/holidays/:year/:month/:day'
    });
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Holiday API server running at http://localhost:${port}`);
});
