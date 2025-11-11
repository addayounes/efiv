import CirculationsListHeader, {
  CirculationFilterKeys,
  DEFAULT_CIRCULATIONS_FILTERS,
} from "../../header";
import { Tabs } from "antd";
import toast from "react-hot-toast";
import { dayjs } from "@/lib/dayjs";
import Table from "@/components/table";
import PageHeader from "@/components/page-header";
import { useEffect, useMemo, useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { useOperationalCirculationsColumns } from "./columns";
import type { ICirculation } from "@/types/entity/circulation";
import { fetchOperationalCirculationService } from "@/services/circulations";

interface OperationalCirculationsProps {}

enum OperationalTabs {
  Today = "Today",
  Tomorrow = "Tomorrow",
}

const OperationalCirculations: React.FC<
  OperationalCirculationsProps
> = ({}) => {
  const [currentTab, setCurrentTab] = useState<OperationalTabs>(
    OperationalTabs.Today
  );
  const [loading, setLoading] = useState(false);
  const columns = useOperationalCirculationsColumns();
  const [filters, setFilters] = useState(DEFAULT_CIRCULATIONS_FILTERS);
  const [circulations, setCirculations] = useState<ICirculation[]>([]);

  const filteredCirculations = useMemo(() => {
    return circulations.filter((circulation) => {
      const departureDate = dayjs(circulation.course.date);
      const compareDate =
        currentTab === OperationalTabs.Today ? dayjs() : dayjs().add(1, "day");
      return departureDate.isSame(compareDate, "day");
    });
  }, [circulations, currentTab]);

  const pagination = usePagination(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetchOperationalCirculationService({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });

        setCirculations(response);
      } catch (error) {
        console.error("Error fetching circulations:", error);
        toast.error(
          "Une erreur est survenue lors du chargement des circulations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, pagination.current, pagination.pageSize]);

  return (
    <div>
      <PageHeader title={`Suivi opérationnel (${dayjs().format("L")})`} />

      <div className="px-6 space-y-4">
        <Tabs
          activeKey={currentTab}
          onChange={(t) => setCurrentTab(t as OperationalTabs)}
        >
          <Tabs.TabPane
            tab={<span className="font-medium">Aujourd'hui</span>}
            key={OperationalTabs.Today}
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="font-medium">Demain</span>}
            key={OperationalTabs.Tomorrow}
          ></Tabs.TabPane>
        </Tabs>

        <CirculationsListHeader
          filters={filters}
          setFilters={setFilters}
          shownFilters={[
            CirculationFilterKeys.Mode,
            CirculationFilterKeys.Query,
            CirculationFilterKeys.Status,
            CirculationFilterKeys.SubMode,
          ]}
        />

        <Table
          bordered
          head={columns}
          loading={loading}
          pagination={pagination}
          data={filteredCirculations}
        />
      </div>
    </div>
  );
};

export default OperationalCirculations;
