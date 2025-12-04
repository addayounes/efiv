import toast from "react-hot-toast";
import Table from "@/components/table";
import { useMotifRetardColumns } from "./columns";
import React, { useEffect, useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { getMotifsDeRetardService } from "@/services/ref";
import type { IMotifRetard } from "@/types/entity/motif-retard";

interface MotifRetardListProps {}

const MotifRetardList: React.FC<MotifRetardListProps> = ({}) => {
  const columns = useMotifRetardColumns();
  const [loading, setLoading] = useState(false);
  const [motifs, setMotifs] = useState<IMotifRetard[]>([]);

  const { setTotal, ...pagination } = usePagination();

  useEffect(() => {
    const fetchMotifs = async () => {
      try {
        setLoading(true);
        const data = await getMotifsDeRetardService();
        setMotifs(data.items ?? []);
        setTotal(data.totalCount);
      } catch (error) {
        toast.error("Erreur lors du chargement des motifs de retard");
      } finally {
        setLoading(false);
      }
    };

    fetchMotifs();
  }, []);

  return (
    <div>
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
