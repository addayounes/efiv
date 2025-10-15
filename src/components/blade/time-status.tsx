import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface TimeStatusProps {
  circulation?: CreateCirculationDto;
}

const TimeStatus: React.FC<TimeStatusProps> = ({ circulation }) => {
  const formattedTime = new Date(
    circulation?.parcours[0]?.depart?.horaire || ""
  ).toLocaleTimeString("fr-FR", {
    timeStyle: "short",
  });

  return (
    <div className="flex gap-4 items-center">
      <p className="text-[30px] font-bold text-blade-yellow">{formattedTime}</p>
      <div className="flex items-center gap-1.5 text-[16px] font-semibold px-2 py-0.5 rounded-full text-white bg-blade-departure-700">
        <CheckCircleIcon />
        <span>À l’heure</span>
      </div>
    </div>
  );
};

const CheckCircleIcon: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0ZM21.6826 9.29199C21.0156 8.59295 19.9083 8.56664 19.209 9.2334L11.8574 16.2471L8.79199 13.3184C8.09332 12.6508 6.98609 12.6756 6.31836 13.374C5.65064 14.0727 5.67536 15.1809 6.37402 15.8486L10.6475 19.9316C11.3235 20.5776 12.3879 20.5781 13.0645 19.9326L21.625 11.7666C22.3243 11.0995 22.3498 9.9913 21.6826 9.29199Z"
        fill="white"
      />
    </svg>
  );
};

export default TimeStatus;
