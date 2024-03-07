import { ReactNode } from "react";
import usePages from "./usePages";

interface FullPagesProps {
  speed?: number;
  mouse?: number;
  drag?: number;
  draggingDistance?: number;
  bg?: string[];
  children?: ReactNode;
}

const BG = ["orange", "dodgerblue", "tomato"];

const FullPages = ({ bg = BG, children }: FullPagesProps) => {
  const pageSize = Array.isArray(children) ? children?.length || 0 : 1;

  const {
    top,
    currentPage,
    pageList,
    // mouse wheel
    scroolMouse,
    // drage
    handleMouseDown,
    handleMouseUp,
    // mobile
    handleTouchStart,
    handleTouchEnd,
    // click
    handlePageChange,
  } = usePages(pageSize);

  return (
    <div
      onWheel={scroolMouse}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ overflow: "hidden", height: "100vh" }}
    >
      <div
        className="box"
        style={{
          width: "100vw",
          marginTop: `${top}px`,
          transition: `all 1s`,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {Array.isArray(children)
          ? children.map((element, index) => (
              <div
                draggable="false"
                style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: bg[Math.floor(index)],
                }}
                key={children.indexOf(element)}
              >
                {element}
              </div>
            ))
          : children}
      </div>
      {
        <nav
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            userSelect: "none",
          }}
        >
          {pageList.map((p) => (
            <p
              key={p}
              style={currentPage === p ? {} : { cursor: "pointer" }}
              onClick={() => handlePageChange(p)}
            >
              {currentPage === p ? "◉" : "●"}
            </p>
          ))}
        </nav>
      }
    </div>
  );
};

export default FullPages;
