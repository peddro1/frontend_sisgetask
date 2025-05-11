import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ open, onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        Tem certeza que deseja excluir este item?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error">Excluir</Button>
      </DialogActions>
    </Dialog>
  );
}
