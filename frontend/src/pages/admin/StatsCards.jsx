// StatsCards.jsx
import { ShoppingCart, Package, TrendingUp, DollarSign, Loader2 } from "lucide-react"

export function StatsCards({
    totalOrders,
    totalProductsSold,
    totalRevenue,
    bestSellingProducts = [], // top 5 sản phẩm
    isLoading,
}) {
    const stats = [
        {
            title: "Total Orders Confirmed",
            value: totalOrders?.totalConfirmed ?? 0,
            icon: ShoppingCart,
            description: "Confirmed orders",
        },
        {
            title: "Total Orders Pending",
            value: totalOrders?.totalPending ?? 0,
            icon: ShoppingCart,
            description: "Pending orders",
        },
        {
            title: "Total Orders Canceled",
            value: totalOrders?.totalCanceled ?? 0,
            icon: ShoppingCart,
            description: "Canceled orders",
        },
        {
            title: "Products Sold",
            value: totalProductsSold ?? 0,
            icon: Package,
            description: "Total units sold",
        },
        {
            title: "Revenue",
            value: totalRevenue ? `$${totalRevenue.toLocaleString()}` : "$0",
            icon: DollarSign,
            description: "Total revenue",
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <div key={index} className="rounded-lg border border-border bg-card shadow-sm">
                        <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                <Icon className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <div className="text-2xl font-semibold text-card-foreground">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                                </>
                            )}
                        </div>
                    </div>
                )
            })}

            {/* Hiển thị Top 5 Best Sellers */}
            {bestSellingProducts.length > 0 && (
                <div className="rounded-lg border border-border bg-card shadow-sm col-span-full">
                    <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Top 5 Best Sellers</h3>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="p-6 pt-0">
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Loading...</span>
                            </div>
                        ) : (
                            <ul className="text-sm text-card-foreground space-y-1">
                                {bestSellingProducts.map((item, idx) => (
                                    <li key={idx}>
                                        {item.title} — {item.totalSold} sold
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
