import { cn } from "@/utils/cn";
import Loading from "../loading";
import { useNavigate } from "react-router-dom";
import { __routes__ } from "@/constants/routes";

interface LinesProps {
  lines: string[];
  loading: boolean;
  activeTabs: string[];
  setActiveTabs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const linesData = [
  { value: "tram_t1", label: "Tramway T1" },
  { value: "tram_t2", label: "Tramway T2" },
  { value: "tram_t3", label: "Tramway T3" },
  { value: "tram_t4", label: "Tramway T4" },
  { value: "bus_20", label: "Bus 20" },
  { value: "bus_21", label: "Bus 21" },
  { value: "bus_27", label: "Bus 27" },
  { value: "bus_29", label: "Bus 29" },
  { value: "bus_38", label: "Bus 38" },
  { value: "bus_42", label: "Bus 42" },
  { value: "bus_47", label: "Bus 47" },
  { value: "bus_52", label: "Bus 52" },
  { value: "bus_58", label: "Bus 58" },
  { value: "bus_63", label: "Bus 63" },
  { value: "bus_69", label: "Bus 69" },
  { value: "bus_72", label: "Bus 72" },
  { value: "bus_80", label: "Bus 80" },
  { value: "bus_85", label: "Bus 85" },
  { value: "bus_91", label: "Bus 91" },
  { value: "bus_95", label: "Bus 95" },
  { value: "bus_96", label: "Bus 96" },
  { value: "bus_124", label: "Bus 124" },
  { value: "bus_129", label: "Bus 129" },
  { value: "bus_170", label: "Bus 170" },
];

const Lines: React.FC<LinesProps> = ({
  lines,
  loading,
  activeTabs,
  setActiveTabs,
}) => {
  const navigate = useNavigate();

  const onLineClick = (lineValue: string) => {
    navigate(`${__routes__.Graphicage.Details.replace(":line", lineValue)}`);

    setActiveTabs((prev) => {
      if (prev.includes(lineValue)) return prev;
      return [...prev, lineValue];
    });
  };

  return (
    <div className="min-w-2xs py-4 border-r border-gray-200">
      <h1 className="mb-6 font-medium text-xl px-4">Liste des lignes</h1>
      {loading ? (
        <div className="text-gray-500">
          <Loading />
        </div>
      ) : (
        <div className="border-t border-gray-200 h-[calc(100vh-149px)] overflow-y-auto">
          {lines.map((item) => (
            <div
              key={item}
              onClick={() => onLineClick(item)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 cursor-pointer ease-out duration-300 border-b border-inherit",
                activeTabs.includes(item)
                  ? "bg-primary-light text-primary"
                  : "text-gray-500 hover:bg-gray-100",
              )}
            >
              <p className="text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lines;
