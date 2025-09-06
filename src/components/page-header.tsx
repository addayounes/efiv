interface PageHeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, rightComponent }) => {
  return (
    <div className="w-full flex items-center justify-between gap-4 py-4 px-6">
      <h1 className="text-2xl font-medium">{title}</h1>
      {rightComponent && <div>{rightComponent}</div>}
    </div>
  );
};

export default PageHeader;
