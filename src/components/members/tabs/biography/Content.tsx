"use client";

import React from "react";
import { Stack } from "@mui/material";
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
import { MembersBiographies } from "@components/members/types";
import ParagraphCard from "@components/members/tabs/biography/ParagraphCard";
import { useMemberContext } from "@components/members/context/MemberContext";
import useUpdateParagraph from "@components/members/hooks/useUpdateParagraph";

export default function Content() {
  const { paragraphs, setParagraphs } = useMemberContext();
  const sensors = useSensors(useSensor(PointerSensor));
  const update = useUpdateParagraph();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleDragEnd = async (event: any) => {
    if (paragraphs) {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = paragraphs.findIndex((p) => p.id === active.id);
      const newIndex = paragraphs.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(paragraphs, oldIndex, newIndex);

      const newStatePromises:Promise<MembersBiographies>[] = [];

      newOrder.forEach((elem, index) => {
        newStatePromises.push(update({id:elem.id, order_number:index+1, }))
      });

      const newState = await Promise.all(newStatePromises);

      setParagraphs(newState);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {paragraphs && (
        <SortableContext
          items={paragraphs.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Stack spacing={2}>
            {paragraphs.map((p, i) => (
              <SortableItem key={p.id} paragraph={p} index={i} />
            ))}
          </Stack>
        </SortableContext>
      )}
    </DndContext>
  );
}

function SortableItem({
  paragraph,
  index,
}: {
  paragraph: MembersBiographies;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: paragraph.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ParagraphCard
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
