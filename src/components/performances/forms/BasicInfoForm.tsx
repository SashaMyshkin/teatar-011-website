import {
  Box,
  MenuItem,
  TextField,
} from "@mui/material";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { sr } from "date-fns/locale";
import { BasicInfoProps } from "@components/performances/types";

export default function BasicInfoForm({formState, errorState,setField, validateField}:BasicInfoProps) {
  const { performanceTypes } = usePerformanceContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "20rem",
      }}
    >
      <Box>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Naziv predstave"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={formState.title}
          error={errorState.title.error}
          helperText={errorState.title.message}
          onChange={(e)=>{
            setField("title", e.target.value)
            validateField("title", e.target.value)
          }}
        />
      </Box>
      <Box>
        <TextField
          required
          margin="dense"
          id="identifier"
          name="identifier"
          label="Identifikator"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={formState.identifier}
          error={errorState.identifier.error}
          helperText={errorState.identifier.message}
          onChange={(e)=>{
            setField("identifier", e.target.value)
            validateField("identifier", e.target.value)
          }}
        />
      </Box>
      <Box>
        <TextField
          select
          required
          margin="dense"
          id="performance_type_uid"
          name="performance_type_uid"
          label="Tip predstave"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={formState.performance_type_uid}
          error={errorState.performance_type_uid.error}
          helperText={errorState.performance_type_uid.message}
          onChange={(e)=>{
            setField("performance_type_uid", e.target.value)
            validateField("performance_type_uid", e.target.value)
          }}
        >
          {performanceTypes.map((elem) => {
            return (
              <MenuItem key={elem.type_name} value={elem.performance_type_uid}>
                {elem.type_name}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sr}>
          <DatePicker
            label="Datum premijere"
            name="date_of_premiere"
            format="dd. MM. yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                size: "small",
                margin: "dense",
                required: true,
                color: "secondary",
              },
            }}
            value={new Date(formState.date_of_premiere)}
          
          onChange={(date)=>{
            setField("date_of_premiere", date)
          }}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <TextField
          margin="dense"
          id="slogan"
          name="slogan"
          label="Slogan"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={formState.slogan}
          error={errorState.slogan.error}
          helperText={errorState.slogan.message}
          onChange={(e)=>{
            setField("slogan", e.target.value)
            validateField("slogan", e.target.value)
          }}
        />
      </Box>
    </Box>
  );
}
