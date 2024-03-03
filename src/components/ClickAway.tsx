import { useClickAway } from '@/hooks/useClickAway'
import { useRef, useState } from 'react'

const ClickAway = () => {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  useClickAway(() => {
    setCount(count + 1)
  }, ref)

  return (
    <div>
      <div ref={ref} className="p-20px bg-gray-200">
        Click outside count: {count}
      </div>
    </div>
  )
}

export default ClickAway
