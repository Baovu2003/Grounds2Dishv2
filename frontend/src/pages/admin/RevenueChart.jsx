"use client"
import React, { useState, useMemo, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"

export function RevenueChart({ data, isLoading }) {
    const [selectedYear, setSelectedYear] = useState(null)

    // Danh sách năm có dữ liệu
    const years = useMemo(() => {
        if (!data) return []
        const uniqueYears = Array.from(new Set(data.map(item => item.year)))
        return uniqueYears.sort((a, b) => b - a) // sắp xếp giảm dần
    }, [data])

    // Gán năm mới nhất khi có data
    useEffect(() => {
        if (years.length > 0 && !selectedYear) {
            setSelectedYear(years[0]) // năm mới nhất
        }
    }, [years, selectedYear])

    // Lọc dữ liệu theo năm chọn (luôn có selectedYear)
    const filteredData = useMemo(() => {
        if (!data || !selectedYear) return []
        return data.filter(item => item.year === selectedYear)
    }, [data, selectedYear])

    // Dữ liệu cho biểu đồ
    const chartData = useMemo(() => {
        if (!filteredData) return []
        return filteredData.map(item => ({
            name: `${item.year}-${item.month.toString().padStart(2, "0")}`,
            revenue: item.revenue
        }))
    }, [filteredData])

    // Tính tổng doanh thu theo từng năm
    const yearlyRevenue = useMemo(() => {
        if (!data) return {}
        return data.reduce((acc, item) => {
            acc[item.year] = (acc[item.year] || 0) + item.revenue
            return acc
        }, {})
    }, [data])

    return (
        <div className="rounded-lg border border-border bg-card shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 md:flex-row md:justify-between md:items-center">
                <div>
                    <h3 className="text-2xl font-semibold text-card-foreground">Monthly Revenue</h3>
                    <p className="text-sm text-muted-foreground">Revenue performance by month</p>
                </div>
                <div className="mt-2 md:mt-0">
                    <select
                        className="border border-border rounded-md p-2 text-sm"
                        value={selectedYear || ""}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Hiển thị tổng doanh thu từng năm */}
            <div className="px-6 mb-4">
                <h4 className="text-lg font-medium mb-2">Total Revenue by Year</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {years.map(year => (
                        <li key={year}>
                            <span className="font-semibold">{year}:</span>{" "}
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND"
                            }).format(yearlyRevenue[year] || 0)}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-6 pt-0">
                {isLoading ? (
                    <div className="flex items-center justify-center h-[350px]">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                            <span className="text-sm text-muted-foreground">Loading chart data...</span>
                        </div>
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="flex items-center justify-center h-[350px]">
                        <p className="text-sm text-muted-foreground">No revenue data available</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                            <XAxis dataKey="name" tick={{ fill: "#065f46", fontSize: 12 }} axisLine={{ stroke: "#10b981" }} />
                            <YAxis tick={{ fill: "#065f46", fontSize: 12 }} axisLine={{ stroke: "#10b981" }} />
                            <Tooltip formatter={(value) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)} />
                            <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}
