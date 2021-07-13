import React, { useState } from 'react'

const numRows = 50
const numCols = 50

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(new Array(numCols), () => 0))
    }

    return rows
  })

  return (
    <div>
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i}-${k}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][k] ? 'pick' : undefined,
              border: 'solid 1px black',
            }}
          ></div>
        ))
      )}
    </div>
  )
}
export default App
