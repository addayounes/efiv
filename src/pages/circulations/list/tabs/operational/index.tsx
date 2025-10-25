import CirculationsListHeader, {
  CirculationFilterKeys,
  DEFAULT_CIRCULATIONS_FILTERS,
} from "../../header";
import { Tabs } from "antd";
import toast from "react-hot-toast";
import { dayjs } from "@/lib/dayjs";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import { useOperationalCirculationsColumns } from "./columns";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data based on filters
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
  }, [filters]);

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
          data={[]}
          head={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default OperationalCirculations;
