import { useState } from "react";
import type { TablePaginationConfig } from "antd";
import { PAGE_SIZE } from "@/constants/pagination";
import type { StateSetter } from "@/types/state-setter";

export const usePagination = (): TablePaginationConfig & {
  setPage: StateSetter<number>;
  setTotal: StateSetter<number>;
} => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const onChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return { current: page, pageSize, total, onChange, setTotal, setPage };
};
