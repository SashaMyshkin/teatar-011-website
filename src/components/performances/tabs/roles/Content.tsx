import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RolesMembersRow } from "../../types";
import { Stack } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import RoleMemberCard from "./RoleMemberCard";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export default function Content() {
  const { rolesMembers } = usePerformanceContext();
  const sensors = useSensors(useSensor(PointerSensor));

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rolesMembers.findIndex(
      (p) => p.performance_role_uid === active.id
    );
    const newIndex = rolesMembers.findIndex(
      (p) => p.performance_role_uid === over.id
    );

    const newOrder = arrayMove(rolesMembers, oldIndex, newIndex);

    const newStatePromises: Promise<RolesMembersRow>[] = [];

    /*newOrder.forEach((elem, index) => {
          newStatePromises.push(update({id:elem.id, order_number:index+1, }))
        });
  
        const newState = await Promise.all(newStatePromises);
  
        setParagraphs(newState);*/
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={rolesMembers.map((item) => item.performance_role_uid ?? 0)}
        strategy={verticalListSortingStrategy}
      >
        <Stack
        sx={{ marginTop: "1rem" }}
          flexDirection={"row"}
          flexWrap="wrap"
          gap={2}
          justifyContent={"space-evenly"}
        >
          {rolesMembers.map((p, i) => (
            <SortableItem key={p.role_name} rolesMembers={p} index={i} />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  index,
  rolesMembers,
}: {
  index: number;
  rolesMembers: RolesMembersRow;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: rolesMembers.performance_role_uid ?? 0 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <RoleMemberCard
        dragHandle={
          <div
            {...attributes}
            {...listeners}
            style={{ cursor: "grab", padding: "0.25rem" }}
          >
            <DragIndicatorIcon />
          </div>
        }
        index={index}
      />
    </div>
  );
}
