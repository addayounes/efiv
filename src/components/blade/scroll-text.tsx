interface ScrollTextProps {
  text: string;
  className?: string;
}

const ScrollText: React.FC<ScrollTextProps> = ({ text, className }) => {
  const shouldScrollCommercialMark = text.length > 8;

  return shouldScrollCommercialMark ? (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r to-transparent z-10 from-blade-departure-900" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l to-transparent z-10 from-blade-departure-900" />
      <div className="whitespace-nowrap animate-horizontal-scroll">
        <p className={className}>{text}</p>
      </div>
    </div>
  ) : (
    <p className={className}>{text}</p>
  );
};

export default ScrollText;
