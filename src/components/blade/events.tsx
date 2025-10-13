import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface EventsProps {
  circulation: CreateCirculationDto;
}

const Events: React.FC<EventsProps> = ({ circulation }) => {
  const message = circulation?.informationsConjoncturelles?.[0]?.texte;

  if (!message?.length) return null;

  return (
    <div className="mt-4">
      <div
        className={`flex items-center gap-2 px-2 rounded-lg leading-9 bg-blade-departure-800`}
      >
        <InfoIcon />
        <p className="text-white text-[16px]">{message}</p>
      </div>
    </div>
  );
};

const InfoIcon: React.FC = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0ZM9.53223 8.70312C9.42728 8.70312 9.3331 8.78479 9.33301 8.90137V11.0371C9.33327 11.1535 9.42737 11.2354 9.53223 11.2354H12.1914V23.1934C12.1915 23.2981 12.2849 23.3913 12.3896 23.3916H16.0996C16.2046 23.3916 16.2987 23.2983 16.2988 23.1934V8.90137C16.2987 8.79644 16.2046 8.70312 16.0996 8.70312H9.53223ZM14.2568 3.5C13.6269 3.50001 13.0898 3.6517 12.6465 3.94336C12.2033 4.24665 11.9932 4.60852 11.9932 5.05176C11.9815 5.49505 12.2032 5.86856 12.6465 6.17188C13.0898 6.4752 13.6269 6.62596 14.2568 6.62598C14.8868 6.62598 15.4356 6.47521 15.8789 6.17188C16.3221 5.86857 16.5557 5.49501 16.5557 5.05176C16.5557 4.62018 16.3337 4.25837 15.8789 3.95508C15.4356 3.65174 14.8868 3.5 14.2568 3.5Z"
        fill="#F8F8F8"
      />
    </svg>
  );
};

export default Events;
