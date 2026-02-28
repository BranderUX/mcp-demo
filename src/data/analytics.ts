// ============================================================================
// TechStore Pro — Analytics & Inventory
// ============================================================================

import { PRODUCTS } from "./products.js";

// ============================================================================
// ANALYTICS
// ============================================================================

export interface FakeAnalytics {
  period: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  newCustomers: number;
  returningCustomers: number;
  topProducts: Array<{ name: string; units: number; revenue: number }>;
  categoryBreakdown: Array<{ category: string; revenue: number; percentage: number }>;
  monthlyTrend: Array<{ month: string; revenue: number; orders: number }>;
}

export const ANALYTICS_DATA: FakeAnalytics = {
  period: "Q4 2025",
  revenue: 1_845_000,
  orders: 1476,
  avgOrderValue: 1249.66,
  newCustomers: 234,
  returningCustomers: 412,
  topProducts: [
    { name: 'MacBook Pro 16" M3 Max', units: 89, revenue: 311_411 },
    { name: "Dell XPS 15 (2025)", units: 134, revenue: 254_466 },
    { name: "ASUS ROG Strix G16", units: 76, revenue: 174_724 },
    { name: "Sony WH-1000XM5", units: 245, revenue: 85_505 },
    { name: "ThinkPad X1 Carbon Gen 12", units: 98, revenue: 161_602 },
  ],
  categoryBreakdown: [
    { category: "Laptops & Computers", revenue: 738_000, percentage: 40 },
    { category: "Audio Equipment", revenue: 461_250, percentage: 25 },
    { category: "Gaming Peripherals", revenue: 369_000, percentage: 20 },
    { category: "Smart Home", revenue: 276_750, percentage: 15 },
  ],
  monthlyTrend: [
    { month: "Jul 2025", revenue: 485_000, orders: 388 },
    { month: "Aug 2025", revenue: 512_000, orders: 410 },
    { month: "Sep 2025", revenue: 478_000, orders: 382 },
    { month: "Oct 2025", revenue: 545_000, orders: 436 },
    { month: "Nov 2025", revenue: 620_000, orders: 496 },
    { month: "Dec 2025", revenue: 680_000, orders: 544 },
    { month: "Jan 2026", revenue: 598_000, orders: 478 },
  ],
};

// ============================================================================
// INVENTORY
// ============================================================================

export interface FakeInventoryItem {
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  status: "healthy" | "low" | "critical" | "out_of_stock";
  lastRestocked: string;
  supplierLeadDays: number;
}

export function getInventoryStatus(): FakeInventoryItem[] {
  return PRODUCTS.map((p) => {
    const status: FakeInventoryItem["status"] =
      p.stock === 0 ? "out_of_stock" : p.stock < 20 ? "critical" : p.stock < 50 ? "low" : "healthy";
    return {
      productId: p.id,
      productName: p.name,
      sku: p.sku,
      category: p.category,
      currentStock: p.stock,
      reorderPoint: 25,
      reorderQuantity: 50,
      status,
      lastRestocked: "2025-12-01",
      supplierLeadDays: status === "critical" ? 3 : 7,
    };
  });
}
