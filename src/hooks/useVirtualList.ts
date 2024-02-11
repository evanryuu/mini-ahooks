import { CSSProperties, useEffect, useMemo, useState } from "react";

// 定义虚拟列表的参数接口
interface VirtualListOptions {
  // 容器的引用
  containerTarget: React.MutableRefObject<HTMLElement | null>;
  // 包裹列表项的引用
  wrapperTarget: React.MutableRefObject<HTMLElement | null>;
  // 单个列表项的高度
  itemHeight: number;
  // 预加载数量
  overscan?: number;
}

// 定义虚拟列表项的接口
interface VirtualListItem<T> {
  // 在原始列表中的索引
  index: number;
  // 对应的数据
  data: T;
}

// 自定义Hook，实现虚拟列表功能
export function useVirtualList<T>(originalList: T[], options: VirtualListOptions): [VirtualListItem<T>[]] {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options;
  const [visibleList, setVisibleList] = useState<VirtualListItem<T>[]>(
    originalList.slice(0, 10).map((data, index) => ({
      index,
      data,
    })) || []
  );
  const [wrapperStyle, setWrapperStyle] = useState<CSSProperties>({}); // 列表包裹元素的样式状态

  const totalHeight = useMemo(() => originalList.length * itemHeight, [originalList]); // wrapper总高度
  const getOffset = (scrollTop: number) => Math.floor(scrollTop / itemHeight) + 1;
  const getDistanceTop = (index: number) => index * itemHeight;
  const getVisibleCount = (containerHeight: number) => Math.ceil(containerHeight / itemHeight);

  // 核心代码
  const updateListAndStyle = () => {
    if (containerTarget.current) {
      // 1. 监听container滚动，并根据当前的滚动位置，以及overscan的预加载量计算可见的列表item
      const { scrollTop, clientHeight } = containerTarget.current; // 获取容器滚动位置和高度

      const offset = getOffset(scrollTop); // 获取偏移量
      const visibleCount = getVisibleCount(clientHeight); // 获取可见列表项数量
      const start = Math.max(0, offset - overscan); // 结合overscan计算起始index
      const end = Math.min(originalList.length, offset + visibleCount + overscan); // 结合overscan计算结束index

      // 2. 根据传入的list和itemHeight去更新wrapper的高度以及上边距
      const offsetTop = getDistanceTop(start); // 获取上部高度
      setWrapperStyle({
        height: totalHeight - offsetTop + "px", // 设置高度
        marginTop: offsetTop + "px", // 设置上边距
      });

      // 3. 更新可见列表
      setVisibleList(
        originalList.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start,
        }))
      );
    }
  };

  useEffect(() => {
    if (!containerTarget.current || !wrapperTarget.current) return;
    const container = containerTarget.current;
    container.addEventListener("scroll", updateListAndStyle);
    return () => container.removeEventListener("scroll", updateListAndStyle);
  }, [containerTarget, wrapperTarget, originalList, itemHeight]);

  useEffect(() => updateListAndStyle, []); // 挂载后更新一次，确保高度正确

  useEffect(() => {
    if (wrapperTarget.current) {
      // @ts-expect-error object key typical error
      Object.keys(wrapperStyle).forEach((key) => (wrapperTarget.current!.style[key] = wrapperStyle[key])); // 更新样式
    }
  }, [wrapperStyle]);

  // 返回当前可见的列表项
  return [visibleList];
}
