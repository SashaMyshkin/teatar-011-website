"use client";

import React, { useEffect, useState } from "react";
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
import { ParagraphRow } from "@/components/members/types";

import { TablePerformancesAbout } from "@components/performances/types";
import ParagraphCard from "./ParagraphCard";
import { usePerformanceContext } from "../../context/PerformanceContext";
//import { updateParagraphOrder } from "@/lib/api"; // you'll define this

interface ContentProps {
  paragraphs: TablePerformancesAbout[];
}

export default function Content() {
  const { paragraphs } = usePerformanceContext();
  const [items, setItems] = useState<TablePerformancesAbout[] | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (paragraphs) setItems(paragraphs);
  }, [paragraphs]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleDragEnd = async (event: any) => {
    if (items) {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((p) => p.id === active.id);
      const newIndex = items.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);

      newOrder.forEach((elem, index) => {
        //updateSubmit({order_number:index}, elem.id)
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {items && <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <Stack spacing={2}>
          {items.map((p) => (
            <SortableItem key={p.id} paragraph={p} />
          ))}
        </Stack>
      </SortableContext>}
    </DndContext>
  );
}

function SortableItem({ paragraph }: { paragraph: TablePerformancesAbout }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: paragraph.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ParagraphCard
        paragraphObject={paragraph}
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
