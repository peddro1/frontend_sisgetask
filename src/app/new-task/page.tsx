"use client";

import {
  Button,
  TextareaAutosize,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import "../../styles/Newtask.css";
import { createTask } from "../services/taskService";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { toast } from "react-toastify";

const NewTask: React.FC = () => {
  const router = useRouter();
  const [formValues, setFormValues] = React.useState<TaskFormData>({
    name: "",
    description: "",
    status: "",
  });

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    setFormValues((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createTask(formValues);
      if (response.status === 201 || response.status === 200) {
        toast.success("Tarefa criada com sucesso!");
        router.push("/home");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Erro ao criar tarefa.");
    }
  };

  return (
    <div>
      <div className="head">
        <div className="leftSide">
          <h1 className="title">Nova Tarefa</h1>
        </div>
        <div className="rightSide">
          <Button
            variant="contained"
            className="btn_save_task"
            onClick={handleSubmit}
          >
            <strong>salvar</strong>
          </Button>
        </div>
      </div>

      <div className="row_1">
        <div className="leftSide1">
          <TextField
            id="outlined-basic"
            label="Título da tarefa"
            variant="outlined"
            fullWidth
            sx={{
              input: {
                color: "#0A6B1A", // texto digitado
              },
              label: {
                color: "#0A6B1A", // cor da label
              },
              "& label.Mui-focused": {
                color: "#0A6B1A", // cor da label quando focada
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#0A6B1A", // borda normal
                },
                "&:hover fieldset": {
                  borderColor: "#0A6B1A", // borda ao passar o mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0A6B1A", // borda ao focar
                },
              },
            }}
            name="name"
            value={formValues.name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="rightSide1">
          <Box sx={{ minWidth: 200, margin: "10px !important" }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: "#0A6B1A", // cor padrão da label
                  "&.Mui-focused": {
                    color: "#0A6B1A", // cor quando está focada
                  },
                }}
              >
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                onChange={handleChangeSelect}
                sx={{
                  backgroundColor: "#F0FFF0", // cor de fundo
                  color: "#0A6B1A", // cor do texto
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0A6B1A", // borda normal
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0A6B1A", // borda ao focar
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0A6B1A", // borda ao passar o mouse
                  },
                  ".MuiSvgIcon-root": {
                    color: "#0A6B1A", // cor do ícone (setinha)
                  },
                }}
                value={formValues.status}
              >
                <MenuItem value={"a iniciar"}>A iniciar</MenuItem>
                <MenuItem value={"em andamento"}>Em andamento</MenuItem>
                <MenuItem value={"finalizada"}>Finalizada</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className="description">
        <div className="leftSide" style={{color: "#0A6B1A"}}>Descrição da tarefa*</div>
      </div>
      <div className="text_area">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          placeholder="Insira uma descrição para a tarefa"
          style={{
            width: "100%",
            padding: 15,
            border: "1px solid #0A6B1A", // borda
            borderRadius: "5px",
            outline: "3px #0A6B1A", // remove o azul padrão do foco
            backgroundColor: "white",
            color: "#0A6B1A", // cor do texto
          }}
          name="description"
          value={formValues.description}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
};

export default NewTask;
