import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { TablePerformancesAbout } from "../../types";
import {
  cardContentSx,
  dragHandleStyle,
  textFieldInputProps,
  textFieldSx,
} from "./styles";
import _ from "lodash";
import useUpdateParagraph from "../../hooks/useUpdateParagraph";
import { usePerformanceContext } from "../../context/PerformanceContext";

interface ParagraphCardProps {
  index: number;
  dragHandle: React.ReactNode;
}

export default function ParagraphCard({
  index,
  dragHandle,
}: ParagraphCardProps) {
  const { paragraphs, setParagraphs } = usePerformanceContext();

  const [paragraphChanges, setParagraphChanges] =
    React.useState<TablePerformancesAbout | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paragraphs) {
      setParagraphChanges(paragraphs[index]);
    }
  }, [paragraphs]);

  const submit = useUpdateParagraph();

  const handleSave = async () => {
    setLoading(true);

    if (paragraphs && paragraphChanges) {
      const data = await submit({
        id: paragraphs[index].id,
        paragraph: paragraphChanges.paragraph,
      });

      const newState = [...paragraphs];
      newState[index].paragraph = data.paragraph;

      setParagraphs(newState);
    }

    setLoading(false);
  };

  if (!(paragraphChanges && paragraphs)) return <></>;

  return (
    <Card variant="outlined" sx={{ position: "relative" }}>
      {dragHandle && <div style={{ ...dragHandleStyle }}>{dragHandle}</div>}

      <CardContent sx={cardContentSx}>
        <TextField
          margin="none"
          fullWidth
          multiline
          value={paragraphChanges.paragraph}
          id={`${paragraphChanges.id}`}
          onChange={(e) =>
            setParagraphChanges((elem) => {
              if (!elem) return null;
              return { ...elem, paragraph: e.target.value };
            })
          }
          variant="standard"
          slotProps={{ input: textFieldInputProps }}
          sx={textFieldSx}
        />
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleSave}
          disabled={_.isEqual(paragraphs[index], paragraphChanges)}
          loading={loading}
        >
          Izmeni
        </Button>
        <Button
          size="small"
          color="warning"
          onClick={()=>setParagraphChanges(paragraphs[index])}
          disabled={_.isEqual(paragraphs[index], paragraphChanges)}
        >
          Otkaži
        </Button>
        <Button
          size="small"
          color="error"
          /* onClick={handleDelete}
          loading={deleteLoading}*/
        >
          Obriši
        </Button>
      </CardActions>
    </Card>
  );
}
