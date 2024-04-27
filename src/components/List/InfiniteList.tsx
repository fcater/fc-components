import { useState, useRef, useEffect } from "react";

type Item = {
  id: string;
  name: string;
};

const InfiniteList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const data = new Array(20).fill({ id: "1", name: "new" });
    setItems((prevItems) => [...prevItems, ...data]);
    setLoading(() => false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) fetchData();
      },
      { threshold: 0.1 }
    );

    if (pageRef.current) observer.observe(pageRef.current);

    return () => {
      if (pageRef.current) observer.unobserve(pageRef.current);
    };
  }, [loading]);

  return (
    <div style={{ height: "20rem", border: "1px red solid", overflow: "scroll" }}>
      {items.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
      <div ref={pageRef}>{loading ? "Loading..." : "End of List"}</div>
    </div>
  );
};

export default InfiniteList;
