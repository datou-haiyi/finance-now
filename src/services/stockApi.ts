import { HotStock, HotSector } from '@/types';
import { fetchRealHotStocks as fetchFromEastmoney, fetchRealHotSectors as fetchSectorsFromEastmoney } from './realStockApi';

const AKSHARE_API_URL = import.meta.env.VITE_AKSHARE_API_URL || 'http://localhost:8000';
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API !== 'false'; // 默认使用真实 API

// Mock 数据 - 热门股票
const generateMockHotStocks = (): HotStock[] => {
  const mockStocks = [
    { code: '600519', name: '贵州茅台', base: 1680.50 },
    { code: '300750', name: '宁德时代', base: 186.80 },
    { code: '002594', name: '比亚迪', base: 256.30 },
    { code: '601012', name: '隆基绿能', base: 18.45 },
    { code: '000858', name: '五粮液', base: 128.90 },
    { code: '600036', name: '招商银行', base: 34.56 },
    { code: '601318', name: '中国平安', base: 45.67 },
    { code: '000333', name: '美的集团', base: 62.34 },
    { code: '600276', name: '恒瑞医药', base: 42.18 },
    { code: '002475', name: '立讯精密', base: 28.92 },
  ];

  return mockStocks.map((stock) => {
    const changePercent = (Math.random() * 20 - 10); // -10% 到 +10%
    const change = stock.base * (changePercent / 100);
    const price = stock.base + change;
    const previousClose = stock.base;
    const amplitude = Math.abs(Math.random() * 8);
    const high = price + (stock.base * amplitude / 200);
    const low = price - (stock.base * amplitude / 200);
    const open = previousClose + (Math.random() * change);

    return {
      code: stock.code,
      name: stock.name,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000000),
      amount: Math.floor(Math.random() * 50000000000),
      turnover: parseFloat((Math.random() * 15).toFixed(2)),
      amplitude: parseFloat(amplitude.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      open: parseFloat(open.toFixed(2)),
      previousClose: parseFloat(previousClose.toFixed(2)),
    };
  }).sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
};

// Mock 数据 - 热门板块
const generateMockHotSectors = (): HotSector[] => {
  const sectors = [
    '新能源汽车', '光伏', '半导体', '人工智能', '医药生物',
    '军工', '白酒', '锂电池', '芯片', '数字经济',
    '储能', '机器人', '氢能源', '消费电子', '云计算'
  ];

  const leadingStocks = [
    '比亚迪', '隆基绿能', '中芯国际', '科大讯飞', '恒瑞医药',
    '中航重机', '贵州茅台', '宁德时代', '中微公司', '东方财富',
    '阳光电源', '埃斯顿', '亿华通', '立讯精密', '用友网络'
  ];

  return sectors.map((name, i) => {
    const changePercent = (Math.random() * 16 - 8); // -8% 到 +8%
    const stockCount = Math.floor(Math.random() * 100) + 20;
    const upRatio = changePercent > 0 ? 0.6 + Math.random() * 0.3 : 0.3 + Math.random() * 0.3;

    return {
      name,
      code: `BK${1000 + i}`,
      changePercent: parseFloat(changePercent.toFixed(2)),
      leadingStock: leadingStocks[i],
      stockCount,
      upCount: Math.floor(stockCount * upRatio),
      downCount: Math.floor(stockCount * (1 - upRatio)),
      amount: Math.floor(Math.random() * 100000000000),
      netInflow: Math.floor((Math.random() * 2 - 1) * 10000000000),
    };
  }).sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
};

// 获取热门股票（从 AkShare API）
const fetchRealHotStocks = async (): Promise<HotStock[]> => {
  try {
    const response = await fetch(`${AKSHARE_API_URL}/stock/hot`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hot stocks');
    }

    const data = await response.json();
    return data.stocks || [];
  } catch (error) {
    console.error('Error fetching hot stocks:', error);
    // 出错时返回 Mock 数据
    return generateMockHotStocks();
  }
};

// 获取热门板块（从 AkShare API）
const fetchRealHotSectors = async (): Promise<HotSector[]> => {
  try {
    const response = await fetch(`${AKSHARE_API_URL}/sector/hot`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hot sectors');
    }

    const data = await response.json();
    return data.sectors || [];
  } catch (error) {
    console.error('Error fetching hot sectors:', error);
    // 出错时返回 Mock 数据
    return generateMockHotSectors();
  }
};

// 导出统一接口
export const fetchHotStocks = async (): Promise<HotStock[]> => {
  if (USE_REAL_API) {
    try {
      // 优先使用东方财富公开 API（无需后端）
      return await fetchFromEastmoney();
    } catch (error) {
      console.error('Failed to fetch from Eastmoney, trying AkShare:', error);
      try {
        // 回退到 AkShare API
        return await fetchRealHotStocks();
      } catch (err) {
        console.error('Failed to fetch from AkShare, using mock data:', err);
        // 最终回退到 Mock 数据
        return generateMockHotStocks();
      }
    }
  }

  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockHotStocks();
};

export const fetchHotSectors = async (): Promise<HotSector[]> => {
  if (USE_REAL_API) {
    try {
      // 优先使用东方财富公开 API（无需后端）
      return await fetchSectorsFromEastmoney();
    } catch (error) {
      console.error('Failed to fetch from Eastmoney, trying AkShare:', error);
      try {
        // 回退到 AkShare API
        return await fetchRealHotSectors();
      } catch (err) {
        console.error('Failed to fetch from AkShare, using mock data:', err);
        // 最终回退到 Mock 数据
        return generateMockHotSectors();
      }
    }
  }

  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockHotSectors();
};
