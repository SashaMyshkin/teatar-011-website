import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useMemberContext } from "@components/members/MembersContext";
import {
  deleteMember,
  toogleActivation,
  tooglePublishing,
} from "@components/members/tabs/publishing/utilis";
import { useState } from "react";
import { useLanguageContext } from "@/components/context/LanguageContext";
import {
  deleteValidation,
  validatePublishing,
} from "@components/members/tabs/publishing/validation";
import { useRouter } from "next/navigation";

export default function Publishing() {
  const { isActive, isPublic, setIsActive, member_uid, setIsPublic } =
    useMemberContext();
  const [loadingActivation, setLoadingActivation] = useState(false);
  const [loadingPublishing, setLoadingPublishing] = useState(false);
  const [loadingDeletion, setLoadingDeletion] = useState(false);
  const [validationResult, setValidationResult] = useState<string[]>([]);
  const router = useRouter();
  const { language } = useLanguageContext();
  const {id:scriptId} = language;

  const handleActivation = async () => {
    setLoadingActivation(true);
    await toogleActivation({
      isActive,

      setIsActive,
      member_uid,
    });
    setValidationResult([]);
    setLoadingActivation(false);
  };

  const handlePublishing = async () => {
    setValidationResult([]);
    setLoadingPublishing(true);

    const result = await validatePublishing({ member_uid, scriptId });

    if (result.length === 0) {
      await tooglePublishing({
        setIsPublic,
        isPublic,
        member_uid,
      });
    } else {
      setValidationResult(result);
    }
    setLoadingPublishing(false);
  };

  const handleDelete = async () => {
    try {
      setLoadingDeletion(true);
      const result = await deleteValidation(member_uid);

      if (result.length === 0) {
        await deleteMember(member_uid);
        router.push("/protected/members");
      }
      setLoadingDeletion(false);
      
    } catch (err) {
      console.log(err);
    } finally{
      setLoadingDeletion(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          margin: "auto",
          gap: "2rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Checkbox
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          color="primary"
          checked={isActive}
          readOnly
        />
        <Checkbox
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          color="primary"
          checked={isPublic}
          readOnly
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "auto",
          gap: "2rem",
        }}
      >
        {!isActive && !isPublic && (
          <Box>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleActivation}
              loading={loadingActivation}
            >
              Proglasi aktivnim
            </Button>
          </Box>
        )}

        {isActive && !isPublic && (
          <Box>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handlePublishing}
              loading={loadingPublishing}
            >
              Objavi na sajtu
            </Button>
          </Box>
        )}
        {isActive && !isPublic && (
          <Box>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleActivation}
              loading={loadingActivation}
            >
              Proglasi neaktivnim
            </Button>
          </Box>
        )}
        {isActive && isPublic && (
          <Box>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handlePublishing}
              loading={loadingPublishing}
            >
              Ukloni sa sajta
            </Button>
          </Box>
        )}

        {!isActive && !isPublic && (
          <Box>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleDelete}
              loading={loadingDeletion}
            >
              Obriši
            </Button>
          </Box>
        )}
      </Box>
      {validationResult.length > 0 && (
        <Paper
          sx={{ width: "30%", margin: "auto", marginTop: "1rem" }}
          elevation={3}
        >
          <List disablePadding>
            {validationResult.map((elem, index) => {
              return (
                <ListItem key={elem}>
                  <ListItemText>
                    {index + 1}. {elem}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}
    </>
  );
}
