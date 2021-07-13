import React, { useCallback, useRef, useState } from 'react'
import produce from 'immer'

const numRows = 50
const numCols = 50
const operations = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
]

const generaEmpty = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(new Array(numCols), () => 0))
  }

  return rows
}

const App: React.FC = () => {
  const [grid, setGrid] = useState(generaEmpty())
  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return

    setGrid((currentGrid) => {
      return produce(currentGrid, (copyGrid) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0
            operations.forEach(([x, y]) => {
              const newI = i + x
              const newk = k + y

              if (newI >= 0 && newI < numRows && newk >= 0 && newk < numCols) {
                neighbors += currentGrid[newI][newk]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              copyGrid[i][k] = 0
            } else if (currentGrid[i][k] === 0 && neighbors === 3) {
              copyGrid[i][k] = 1
            }
          }
        }
      })
    })

    setTimeout(runSimulation, 100)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running)
          if (!running) {
            runningRef.current = true
            runSimulation()
          }
        }}
      >
        {running ? 'stop' : 'start'}
      </button>
      <button
        onClick={() => {
          const rows = []
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(new Array(numCols), () =>
                Math.random() < 0.5 ? 1 : 0
              )
            )
          }

          setGrid(rows)
        }}
      >
        random
      </button>
      <button
        onClick={() => {
          setGrid(generaEmpty())
        }}
      >
        clear
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = gridCopy[i][k] ? 0 : 1
                })
                setGrid(newGrid)
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'pink' : '',
                border: 'solid 1px black',
                boxSizing: 'border-box',
              }}
            ></div>
          ))
        )}
      </div>
    </>
  )
}
export default App
