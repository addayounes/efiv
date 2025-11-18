import { useState } from "react";
import type { TablePaginationConfig } from "antd";
import type { StateSetter } from "@/types/state-setter";

export const usePagination = (): TablePaginationConfig & {
  setTotal: StateSetter<number>;
} => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const onChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return { current: page, pageSize, total, onChange, setTotal };
};
