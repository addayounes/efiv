import type {
  ColumnsType,
  TablePaginationConfig,
  TableProps as AntTableProps,
} from "antd/es/table";
import { cn } from "@/utils/cn";
import { Table as AntTable } from "antd";
import { PAGE_SIZE } from "@/constants/pagination";

interface TableProps<T> extends AntTableProps<any> {
  data: T[];
  loading?: boolean;
  head: ColumnsType<T>;
  pagination?: TablePaginationConfig;
}

function Table<T>({
  data,
  head,
  loading,
  bordered,
  pagination,
  ...props
}: TableProps<T>) {
  return (
    <AntTable
      columns={head}
      dataSource={data}
      loading={loading}
      locale={{ emptyText: "Aucun élément" }}
      pagination={
        pagination
          ? {
              disabled: loading,
              pageSize: PAGE_SIZE,
              position: ["bottomRight"],
              ...pagination,
            }
          : false
      }
      className={cn(
        props.className,
        bordered ? "border border-gray-100 rounded " : ""
      )}
      {...props}
    />
  );
}

export default Table;
