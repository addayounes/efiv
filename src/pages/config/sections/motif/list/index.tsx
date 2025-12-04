import { Input } from "antd";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import Table from "@/components/table";
import { useMotifRetardColumns } from "./columns";
import React, { useEffect, useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { getMotifsDeRetardService } from "@/services/ref";
import type { IMotifRetard } from "@/types/entity/motif-retard";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";

interface MotifRetardListProps {}

const MotifRetardList: React.FC<MotifRetardListProps> = ({}) => {
  const columns = useMotifRetardColumns();
  const [loading, setLoading] = useState(false);
  const [motifs, setMotifs] = useState<IMotifRetard[]>([]);

  const { search, setSearch, debouncedSearch } = useDebouncedSearch();
  const { setTotal, ...pagination } = usePagination();

  useEffect(() => {
    const fetchMotifs = async () => {
      try {
        setLoading(true);
        const data = await getMotifsDeRetardService({
          term: debouncedSearch,
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
        setMotifs(data.items ?? []);
        setTotal(data.totalCount);
      } catch (error) {
        toast.error("Erreur lors du chargement des motifs de retard");
      } finally {
        setLoading(false);
      }
    };

    fetchMotifs();
  }, [debouncedSearch]);

  return (
    <div className="space-y-6">
      <div className="w-1/3">
        <Input
          value={search}
          placeholder="Rechercher un motif de retard"
          onChange={(e) => setSearch(e.target.value)}
          prefix={<Search size={18} className="text-gray-300 mr-1" />}
        />
      </div>
      <Table
        bordered
        head={columns}
        loading={loading}
        data={motifs ?? []}
        pagination={pagination}
      />
    </div>
  );
};

export default MotifRetardList;
