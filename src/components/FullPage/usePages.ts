import {
  useEffect,
  useState,
  MouseEventHandler,
  TouchEventHandler,
} from "react";
import throttle from "../../utilities/throttle";

const DRAGGING_DISTANCE = 30;

const THROTTLE_TIME = {
  mouse: 1000,
  drag: 500,
};

//边缘检测
const getCurrentPage = (
  currentPage: number,
  pageSize: number,
  isUp: boolean = true
) => {
  if (isUp) return currentPage <= 0 ? (currentPage = pageSize) : currentPage;
  else return currentPage >= pageSize + 1 ? (currentPage = 1) : currentPage;
};

function usePages(pageSize: number) {
  const [top, setTop] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mobileTochY, setMobileTochY] = useState(0);

  let [currentPage, setCurrentPage] = useState(1);
  const [pageList, setPageList] = useState<number[]>([]);

  //翻页逻辑
  const changePage = (goUp: boolean = true) => {
    if (goUp) currentPage -= 1;
    else currentPage += 1;
    currentPage = getCurrentPage(currentPage, pageSize, goUp);
    setCurrentPage(currentPage);
  };

  //圆点切页 无节流
  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  //滚轮切页 节流1s
  const scroolMouse = (e: WheelEvent) => {
    e.deltaY < 0 ? changePage() : changePage(false);
  };

  // 拖拽切页 节流0.5s
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setMouseY(e.clientY);
  };

  const handleMouseUp = (e: WheelEvent) => {
    const action = Math.abs(e.clientY - mouseY) > DRAGGING_DISTANCE;
    if (action) e.clientY < mouseY ? changePage(false) : changePage();
  };

  //移动端操作
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setMobileTochY(e.changedTouches[0].screenY);
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const action =
      Math.abs(mobileTochY - e.changedTouches[0].screenY) > DRAGGING_DISTANCE;

    if (action) {
      mobileTochY < e.changedTouches[0].screenY
        ? changePage()
        : changePage(false);
    }
  };

  useEffect(() => {
    setTop(-window.innerHeight * (currentPage - 1));
  }, [currentPage]);

  useEffect(() => {
    const pageList = [];
    for (let i = 1; i <= pageSize; i++) {
      pageList.push(i);
    }
    setPageList(pageList);
  }, [pageSize]);

  return {
    top,
    currentPage,
    pageList,
    scroolMouse: throttle(scroolMouse, THROTTLE_TIME.mouse),
    // drage
    handleMouseDown,
    handleMouseUp: throttle(handleMouseUp, THROTTLE_TIME.drag),
    // mobile
    handleTouchStart,
    handleTouchEnd,
    // click
    handlePageChange,
  };
}

export default usePages;
