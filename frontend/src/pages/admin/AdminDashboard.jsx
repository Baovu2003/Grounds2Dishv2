"use client"
import React, { useEffect, useState } from "react"
import { StatsCards } from "./StatsCards"
import { RevenueChart } from "./RevenueChart"
import { apiAdminClient } from "../../constants/apiUrl"


export default function AdminDashboard() {
    const [totalOrders, setTotalOrders] = useState({ totalConfirmed: 0, totalPending: 0, totalCanceled: 0 })
    const [totalProductsSold, setTotalProductsSold] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [bestSellingProducts, setBestSellingProducts] = useState([]) // top 5 sản phẩm
    const [monthlyRevenue, setMonthlyRevenue] = useState([])
    const [loading, setLoading] = useState(true) // chỉ loading lần đầu
    const [error, setError] = useState(null)

    const fetchStats = async (isInitial = false) => {
        try {
            if (isInitial) setLoading(true);

            const token = localStorage.getItem("token"); // 👈 lấy token đã lưu sau login

            console.log("token", token)
            const data = await apiAdminClient("/dashboard/stats/overview");

            setTotalOrders((prev) =>
                JSON.stringify(prev) === JSON.stringify(data.totalOrders) ? prev : data.totalOrders
            );
            setTotalProductsSold((prev) =>
                prev === data.totalProductsSold ? prev : data.totalProductsSold
            );
            setTotalRevenue((prev) =>
                prev === data.totalRevenue ? prev : data.totalRevenue
            );
            setBestSellingProducts((prev) =>
                JSON.stringify(prev) === JSON.stringify(data.bestSellingProducts) ? prev : data.bestSellingProducts
            );
            setMonthlyRevenue((prev) =>
                JSON.stringify(prev) === JSON.stringify(data.monthlyRevenue) ? prev : data.monthlyRevenue
            );

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            if (isInitial) setLoading(false);
        }
    };


    useEffect(() => {
        fetchStats(true) // lần đầu có loading
        const interval = setInterval(() => fetchStats(false), 60000) // refresh mỗi 60s, ngầm
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">Monitor your sales performance and product analytics</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive">{error}</p>
                    </div>
                )}

                <StatsCards
                    totalOrders={totalOrders}
                    totalProductsSold={totalProductsSold}
                    totalRevenue={totalRevenue}
                    bestSellingProducts={bestSellingProducts}
                    isLoading={loading}
                />

                <div className="mt-8">
                    <RevenueChart data={monthlyRevenue} isLoading={loading} />
                </div>
            </main>
        </div>
    )
}
