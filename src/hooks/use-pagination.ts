import { useState } from "react";
import type { TablePaginationConfig } from "antd";

export const usePagination = (total: number): TablePaginationConfig => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return { current: page, pageSize, total, onChange };
};
