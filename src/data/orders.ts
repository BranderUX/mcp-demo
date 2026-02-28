// ============================================================================
// TechStore Pro — Orders
// ============================================================================

export interface FakeOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface FakeOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: FakeOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  orderDate: string;
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export const ORDERS: FakeOrder[] = [
  {
    id: "ord-001",
    orderNumber: "TSP-1001",
    customerId: "cust-001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    status: "delivered",
    items: [
      {
        productId: "prod-001",
        productName: 'MacBook Pro 16" M3 Max',
        quantity: 1,
        unitPrice: 3499,
        total: 3499,
      },
      {
        productId: "prod-006",
        productName: "Sony WH-1000XM5",
        quantity: 1,
        unitPrice: 349,
        total: 349,
      },
    ],
    subtotal: 3848,
    tax: 346.32,
    shipping: 0,
    total: 4194.32,
    orderDate: "2025-12-15",
    shippingAddress: "123 Market St, San Francisco, CA 94105",
    trackingNumber: "1Z999AA10123456784",
    estimatedDelivery: "2025-12-20",
  },
  {
    id: "ord-002",
    orderNumber: "TSP-1002",
    customerId: "cust-004",
    customerName: "Emily Rodriguez",
    customerEmail: "emily.r@gamedev.com",
    status: "shipped",
    items: [
      {
        productId: "prod-004",
        productName: "ASUS ROG Strix G16",
        quantity: 1,
        unitPrice: 2299,
        total: 2299,
      },
      {
        productId: "prod-013",
        productName: "Razer Huntsman V3 Pro",
        quantity: 1,
        unitPrice: 249,
        total: 249,
      },
      {
        productId: "prod-014",
        productName: "Logitech G Pro X Superlight 2",
        quantity: 2,
        unitPrice: 159,
        total: 318,
      },
    ],
    subtotal: 2866,
    tax: 257.94,
    shipping: 0,
    total: 3123.94,
    orderDate: "2026-01-20",
    shippingAddress: "456 Tech Blvd, San Jose, CA 95110",
    trackingNumber: "1Z999AA10123456785",
    estimatedDelivery: "2026-01-26",
  },
  {
    id: "ord-003",
    orderNumber: "TSP-1003",
    customerId: "cust-002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@techcorp.com",
    status: "processing",
    items: [
      {
        productId: "prod-002",
        productName: "Dell XPS 15 (2025)",
        quantity: 3,
        unitPrice: 1899,
        total: 5697,
      },
    ],
    subtotal: 5697,
    tax: 512.73,
    shipping: 0,
    total: 6209.73,
    orderDate: "2026-01-08",
    shippingAddress: "789 University Ave, Palo Alto, CA 94301",
  },
  {
    id: "ord-004",
    orderNumber: "TSP-1004",
    customerId: "cust-003",
    customerName: "Michael Chen",
    customerEmail: "m.chen@designstudio.com",
    status: "delivered",
    items: [
      {
        productId: "prod-019",
        productName: "Shure SM7B Microphone",
        quantity: 2,
        unitPrice: 399,
        total: 798,
      },
      {
        productId: "prod-008",
        productName: "Audio-Technica ATH-M50x",
        quantity: 3,
        unitPrice: 149,
        total: 447,
      },
    ],
    subtotal: 1245,
    tax: 112.05,
    shipping: 9.99,
    total: 1367.04,
    orderDate: "2025-11-22",
    shippingAddress: "321 Design Ln, Oakland, CA 94607",
    trackingNumber: "1Z999AA10123456786",
  },
  {
    id: "ord-005",
    orderNumber: "TSP-1005",
    customerId: "cust-008",
    customerName: "Alex Turner",
    customerEmail: "alex.t@esports.gg",
    status: "delivered",
    items: [
      {
        productId: "prod-015",
        productName: 'Samsung Odyssey G9 49"',
        quantity: 1,
        unitPrice: 999,
        total: 999,
      },
      {
        productId: "prod-017",
        productName: "SteelSeries Arctis Nova Pro Wireless",
        quantity: 1,
        unitPrice: 349,
        total: 349,
      },
    ],
    subtotal: 1348,
    tax: 121.32,
    shipping: 0,
    total: 1469.32,
    orderDate: "2026-01-25",
    shippingAddress: "555 Gaming Ave, Austin, TX 78701",
    trackingNumber: "1Z999AA10123456787",
  },
  {
    id: "ord-006",
    orderNumber: "TSP-1006",
    customerId: "cust-010",
    customerName: "Robert Chang",
    customerEmail: "r.chang@enterprise.io",
    status: "shipped",
    items: [
      {
        productId: "prod-003",
        productName: "ThinkPad X1 Carbon Gen 12",
        quantity: 10,
        unitPrice: 1649,
        total: 16490,
      },
    ],
    subtotal: 16490,
    tax: 1484.1,
    shipping: 0,
    total: 17974.1,
    orderDate: "2026-02-01",
    shippingAddress: "100 Wall St, New York, NY 10005",
    trackingNumber: "1Z999AA10123456788",
    estimatedDelivery: "2026-02-07",
  },
  {
    id: "ord-007",
    orderNumber: "TSP-1007",
    customerId: "cust-006",
    customerName: "Lisa Wang",
    customerEmail: "lisa.w@mediapro.com",
    status: "pending",
    items: [
      {
        productId: "prod-009",
        productName: "Blue Yeti X USB Microphone",
        quantity: 1,
        unitPrice: 169,
        total: 169,
      },
      {
        productId: "prod-007",
        productName: "Bose QuietComfort Ultra",
        quantity: 1,
        unitPrice: 429,
        total: 429,
      },
    ],
    subtotal: 598,
    tax: 53.82,
    shipping: 9.99,
    total: 661.81,
    orderDate: "2026-01-12",
    shippingAddress: "900 Hollywood Blvd, Los Angeles, CA 90028",
  },
  {
    id: "ord-008",
    orderNumber: "TSP-1008",
    customerId: "cust-005",
    customerName: "David Kim",
    customerEmail: "d.kim@startup.com",
    status: "delivered",
    items: [
      {
        productId: "prod-020",
        productName: 'MacBook Air 15" M3',
        quantity: 1,
        unitPrice: 1299,
        total: 1299,
      },
      {
        productId: "prod-010",
        productName: "Amazon Echo Show 15",
        quantity: 2,
        unitPrice: 249,
        total: 498,
      },
    ],
    subtotal: 1797,
    tax: 161.73,
    shipping: 0,
    total: 1958.73,
    orderDate: "2025-10-30",
    shippingAddress: "200 Startup Way, San Francisco, CA 94107",
    trackingNumber: "1Z999AA10123456789",
  },
  {
    id: "ord-009",
    orderNumber: "TSP-1009",
    customerId: "cust-007",
    customerName: "James Wilson",
    customerEmail: "j.wilson@home.com",
    status: "cancelled",
    items: [
      {
        productId: "prod-012",
        productName: "Ring Video Doorbell Pro 2",
        quantity: 1,
        unitPrice: 249,
        total: 249,
      },
    ],
    subtotal: 249,
    tax: 22.41,
    shipping: 9.99,
    total: 281.4,
    orderDate: "2025-08-15",
    shippingAddress: "600 Pine St, Seattle, WA 98101",
  },
  {
    id: "ord-010",
    orderNumber: "TSP-1010",
    customerId: "cust-004",
    customerName: "Emily Rodriguez",
    customerEmail: "emily.r@gamedev.com",
    status: "delivered",
    items: [
      {
        productId: "prod-005",
        productName: "Alienware m18 R2",
        quantity: 1,
        unitPrice: 3199,
        total: 3199,
      },
      {
        productId: "prod-015",
        productName: 'Samsung Odyssey G9 49"',
        quantity: 1,
        unitPrice: 999,
        total: 999,
      },
      {
        productId: "prod-013",
        productName: "Razer Huntsman V3 Pro",
        quantity: 1,
        unitPrice: 249,
        total: 249,
      },
    ],
    subtotal: 4447,
    tax: 400.23,
    shipping: 0,
    total: 4847.23,
    orderDate: "2025-11-28",
    shippingAddress: "456 Tech Blvd, San Jose, CA 95110",
    trackingNumber: "1Z999AA10123456790",
  },
];
