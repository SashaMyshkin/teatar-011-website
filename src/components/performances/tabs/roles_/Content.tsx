"use client";

import React from "react";
import { Divider, Stack } from "@mui/material";
import {
  DndContext,
  closestCenter,
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
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  RolesRow,
} from "@components/performances/types";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import RoleCard from "@/components/performances/tabs/roles/RoleMemberCard";
import Loading from "@/components/loading/Loading";
import useUpdateRole from "@components/performances/hooks/useUpdateRole";

const itemsPerColumn = 4;
//const columnWidth = 250;

export default function Content() {
  const { roles,setRoles } = usePerformanceContext();
  const sensors = useSensors(useSensor(PointerSensor));
  const update = useUpdateRole();

  if (!roles) return <Loading></Loading>;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleDragEnd = async (event: any) => {
    if (roles) {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = roles.findIndex(
        (p) => p.performance_role_uid === active.id
      );
      const newIndex = roles.findIndex(
        (p) => p.performance_role_uid === over.id
      );

      const newOrder = arrayMove(roles, oldIndex, newIndex);

      const newStatePromises: Promise<RolesRow>[] = [];

      newOrder.forEach((elem, index) => {
        newStatePromises.push(update({id:elem.performance_role_uid ?? 0, order_number:index+1, }))
      });

      const newState = await Promise.all(newStatePromises);

      setRoles(newState);
    }
  };

  // Function to split items into columns with controlled items per column

  // Function to split items into columns with controlled items per column
  const createColumns = (items: RolesRow[], itemsPerColumn: number) => {
    const columns = [];

    for (let i = 0; i < items.length; i += itemsPerColumn) {
      columns.push(items.slice(i, i + itemsPerColumn));
    }

    return columns;
  };

  // Control how many items per column you want
  const columns = createColumns(roles, itemsPerColumn);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {roles && (
        <SortableContext
          items={roles.map((item) => item.performance_role_uid ?? 0)}
          strategy={verticalListSortingStrategy}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop:"2rem",
              height: "2rem",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {columns.map((columnItems, columnIndex) => (
              <>
                <Stack
                  key={`${columnIndex}N`}
                  spacing="0.8rem"
                  sx={{
                    flex: "1 1 auto",
                    alignItems: "center",
                  }}
                >
                  {columnItems.map((p, i) => {
                    const globalIndex =
                      columns
                        .slice(0, columnIndex)
                        .reduce((sum, col) => sum + col.length, 0) + i;
                    return (
                      <SortableItem
                        key={p.role_name ?? `${columnIndex}M`}
                        role={p}
                        index={globalIndex}
                      />
                    );
                  })}
                </Stack>

                {/* Add divider between columns (but not after the last one) */}
                {columnIndex < columns.length - 1 && (
                  <Divider orientation="vertical" sx={{ height: "100%" }} />
                )}
              </>
            ))}
          </Stack>
        </SortableContext>
      )}
    </DndContext>
  );
}

function SortableItem({ role, index }: { role: RolesRow; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: role.performance_role_uid ?? 0 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <RoleCard
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
