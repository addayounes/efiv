import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";

interface SortableElementProps {
  id: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const SortableElement = ({ id, disabled, children }: SortableElementProps) => {
  const {
    listeners,
    transform,
    attributes,
    setNodeRef,
    transition,
    isDragging,
  } = useSortable({ id, animateLayoutChanges: defaultAnimateLayoutChanges });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    ...(isDragging && {
      transform: `${CSS.Transform.toString(transform)} scale(1.2) rotate(1deg)`,
    }),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="relative">
        {children}

        {!disabled && (
          <div
            className="absolute top-1/2 right-0 p-1 -translate-y-1/2"
            {...listeners}
          >
            <GripHorizontal
              className="rotate-90 cursor-grab text-gray-500"
              size={16}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortableElement;
