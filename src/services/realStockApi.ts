import { HotStock, HotSector } from '@/types';

// 使用东方财富公开 API 获取热门股票
export const fetchRealHotStocks = async (): Promise<HotStock[]> => {
  try {
    // 东方财富热门股票接口（按涨跌幅排序）
    const response = await fetch(
      'https://push2.eastmoney.com/api/qt/clist/get?' +
      'pn=1&pz=20&po=1&np=1&fltt=2&invt=2&' +
      'fid=f3&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23&' +
      'fields=f12,f14,f2,f3,f4,f5,f6,f7,f8,f15,f16,f17,f18,f20,f21',
      {
        headers: {
          'Referer': 'http://quote.eastmoney.com/',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Eastmoney API');
    }

    const data = await response.json();

    if (!data?.data?.diff) {
      throw new Error('Invalid data format');
    }

    // 转换数据格式
    const stocks: HotStock[] = data.data.diff.map((item: any) => ({
      code: item.f12,           // 股票代码
      name: item.f14,           // 股票名称
      price: item.f2 / 100,     // 最新价（分转元）
      change: item.f4 / 100,    // 涨跌额
      changePercent: item.f3,   // 涨跌幅 %
      volume: item.f5,          // 成交量（手）
      amount: item.f6,          // 成交额（元）
      amplitude: item.f7,       // 振幅 %
      high: item.f15 / 100,     // 最高价
      low: item.f16 / 100,      // 最低价
      open: item.f17 / 100,     // 开盘价
      previousClose: item.f18 / 100, // 昨收价
      turnover: item.f8 || 0,   // 换手率
    }));

    return stocks.slice(0, 10);
  } catch (error) {
    console.error('Error fetching real hot stocks:', error);
    throw error;
  }
};

// 使用东方财富公开 API 获取热门板块
export const fetchRealHotSectors = async (): Promise<HotSector[]> => {
  try {
    // 东方财富板块接口（概念板块）
    const response = await fetch(
      'https://push2.eastmoney.com/api/qt/clist/get?' +
      'pn=1&pz=20&po=1&np=1&fltt=2&invt=2&' +
      'fid=f3&fs=m:90+t:3&' +
      'fields=f12,f14,f2,f3,f4,f5,f6,f104,f105,f106',
      {
        headers: {
          'Referer': 'http://quote.eastmoney.com/',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Eastmoney API');
    }

    const data = await response.json();

    if (!data?.data?.diff) {
      throw new Error('Invalid data format');
    }

    // 转换数据格式
    const sectors: HotSector[] = data.data.diff.map((item: any) => {
      const stockCount = (item.f104 || 0) + (item.f105 || 0); // 上涨+下跌

      return {
        name: item.f14,             // 板块名称
        code: item.f12,             // 板块代码
        changePercent: item.f3,     // 涨跌幅 %
        leadingStock: item.f128 || '-', // 领涨股（如果API提供）
        stockCount: stockCount || 100,  // 个股数量
        upCount: item.f104 || 0,    // 上涨数
        downCount: item.f105 || 0,  // 下跌数
        amount: item.f6 || 0,       // 成交额
        netInflow: item.f62 || 0,   // 主力净流入
      };
    });

    return sectors.slice(0, 10);
  } catch (error) {
    console.error('Error fetching real hot sectors:', error);
    throw error;
  }
};
