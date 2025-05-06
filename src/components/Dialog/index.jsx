import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "primereact/button";
import { requestDeleteItem } from "../../api/apiRequests";

const DialogBox = ({ openDialog, handleCloseDialog, formik, setLoadingDeleteItem, noty }) => {
  return (
    <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Tem cereteza que deseja exluir esse item?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Ao confirmar, o item será deletado permanentemente e não podera ser
        recuperado. Confirme se deseja prosseguir.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        style={{ padding: "10px" }}
        onClick={() => {
          handleCloseDialog();
        }}
      >
        Cancelar
      </Button>
      <Button
        style={{ padding: "10px" }}
        onClick={() => {
          requestDeleteItem(formik.values.id, setLoadingDeleteItem, noty);
          formik.resetForm();
          handleCloseDialog();
        }}
        autoFocus
      >
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default DialogBox;
