import {
  getBooleanEmoji,
  getMainStats,
  getPriceStats,
  getLatestLongTermDebt,
} from "../utils/utils";
import { mockStatsData } from "../utils/mockStatsData";
import { mockBalanceSheetData } from "../utils/mockBalanceSheetData";

describe("utils", function () {
  it("getBooleanEmoji returns correct emojis", function () {
    expect(getBooleanEmoji(true)).toBe("✨");
    expect(getBooleanEmoji(false)).toBe("👎🏽");
  });

  it("getMainStats returns correct values", function () {
    const mainStats = getMainStats(mockStatsData.defaultKeyStatistics);
    expect(mainStats.sharesOutstanding).toBe(315639008);
    expect(mainStats.epsTtm).toBe(112.197);
    expect(mainStats.epsMostRecent).toBe(240.88594089105743);
    expect(mainStats.bookValue).toBe(380.044);
    expect(mainStats.totalAssets).toBe(119956711156.35199);
  });

  it("getPriceStats returns correct values", function () {
    const priceStats = getPriceStats(mockStatsData.price);
    expect(priceStats.priceValue).toBe(2830.43);
    expect(priceStats.symbol).toBe("GOOG");
  });

  it("getLatestLongTermDebt returns correct number", function () {
    const latestLongTermDebt = getLatestLongTermDebt(
      mockBalanceSheetData.timeSeries
    );
    expect(latestLongTermDebt).toBe(12844000000);
  });
});
