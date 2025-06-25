"use client";

import React, { useState } from "react";
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
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Paragraph } from "@/components/members/tabs/biography/editor/types";
import ParagraphCard from "@/components/members/tabs/biography/editor/ParagraphCard";
import { ParagraphRow } from "@/components/members/types";
//import { updateParagraphOrder } from "@/lib/api"; // you'll define this

export default function Content({ paragraphRows }: { paragraphRows: ParagraphRow[] }) {
  const [items, setItems] = useState(paragraphRows);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((p) => p.id === active.id);
    const newIndex = items.findIndex((p) => p.id === over.id);

    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);

    // Optionally update DB with new order
    //await updateParagraphOrder(newOrder);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <Stack spacing={2}>
          {items.map((p) => (
            <SortableItem key={p.id} paragraph={p} />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ paragraph }: { paragraph: Paragraph }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: paragraph.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ParagraphCard
        id={paragraph.id}
        initialText={paragraph.paragraph}
        dragHandle={
          <div
            {...attributes}
            {...listeners}
            style={{ cursor: "grab", padding: "0.25rem" }}
          >
            <DragIndicatorIcon />
          </div>
        }
      />
    </div>
  );
}
