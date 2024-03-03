import { useMemo, useRef } from 'react'
import { useVirtualList } from '@/hooks/useVirtualList'

export default () => {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  const originalList = useMemo(() => Array.from(Array(99999).keys()), [])

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 60,
  })
  return (
    <>
      <div ref={containerRef} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div className="h-52px justify-center items-center border mb-8px w-210px" key={ele.index}>
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
