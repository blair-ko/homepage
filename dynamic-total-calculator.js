import React, { useState, useEffect } from "react"

const TotalCalculator = () => {
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // 初始化30行，數量預設為1
    setRows(
      Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        price: 0,
        quantity: 1 // 預設數量為1
      }))
    )
  }, [])

  useEffect(() => {
    const newTotal = rows.reduce(
      (sum, row) => sum + row.price * row.quantity,
      0
    )
    setTotal(newTotal)

    // 檢查是否需要添加新行
    if (rows.every(row => row.price !== 0)) {
      setRows(prev => [...prev, { id: prev.length + 1, price: 0, quantity: 1 }])
    }
  }, [rows])

  const handleChange = (id, field, value) => {
    setRows(prev =>
      prev.map(row => {
        if (row.id === id) {
          // 確保數量至少為1
          const newValue =
            field === "quantity"
              ? Math.max(1, parseInt(value) || 1)
              : parseFloat(value) || 0
          return { ...row, [field]: newValue }
        }
        return row
      })
    )
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        總額: {total.toFixed(2)}
      </h1>
      <div className="space-y-4">
        {rows.map(row => (
          <div
            key={row.id}
            className="flex items-stretch bg-white rounded-lg shadow-md p-4"
          >
            <span className="w-10 flex items-center justify-center text-lg font-semibold text-gray-600">
              {row.id}.
            </span>
            <div className="flex-grow ml-4">
              <div className="grid grid-cols-10 gap-4 mb-2">
                <input
                  type="number"
                  value={row.price || ""}
                  onChange={e => handleChange(row.id, "price", e.target.value)}
                  className="col-span-7 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="單價"
                />
                <input
                  type="number"
                  value={row.quantity}
                  onChange={e =>
                    handleChange(row.id, "quantity", e.target.value)
                  }
                  className="col-span-3 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="數量"
                  min="1"
                />
              </div>
              <div className="text-right text-gray-600">
                小計: {(row.price * row.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TotalCalculator
