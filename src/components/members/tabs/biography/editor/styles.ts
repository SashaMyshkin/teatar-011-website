// Styles extracted outside JSX
export const dragHandleStyle: React.CSSProperties = {
  position: "absolute",
  right: 0,
};

export const cardContentSx = {
  "& .mui-bzx8zh-MuiInputBase-root-MuiInput-root": {
    minHeight: "0 !important",
  },
  padding: "1.3rem",
  paddingBottom: 0,
};

export const textFieldInputProps = {
  disableUnderline: true,
  sx: {
    fontSize: "1rem",
    padding: 0,
    backgroundColor: "transparent",
    minHeight: "200px",
    border: "none",
    outline: "none",
    resize: "none",
  },
};

export const textFieldSx = {
  border: "1px solid transparent",
  "& .MuiInputBase-root": {
    border: "none",
  },
  "& .MuiInputBase-inputMultiline": {
    outline: "none !important",
  },
};
