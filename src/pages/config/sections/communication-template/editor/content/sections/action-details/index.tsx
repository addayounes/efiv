import { Drawer } from "antd";

interface EditorActionDetailsProps {}

const EditorActionDetails: React.FC<EditorActionDetailsProps> = ({}) => {
  return (
    <Drawer
      // open
      mask={false}
      title="Détails de l'action"
      // onClose={onClose}
      // open={open === item.type}
    ></Drawer>
  );
};

export default EditorActionDetails;
