"use client";

import { useEffect, useState } from "react";
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
import { editTask, getTaskByID, TaskResponse } from "../services/taskService";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Suspense } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "../../../node_modules/next/navigation";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

function EditUserContent(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const [task, setTask] = useState<TaskResponse>();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    useEffect(() => {
        const fetchTask = async () => {
          
          const data = await getTaskByID(userId?? "");
          setTask(data);
          setFormValues((prev) => ({
            ...prev,
            name: data.name,
            description: data.description,
            status: data.status,
          }));
          
        };
    
        fetchTask();
    }, []);

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
  
    const handleSubmit = async () => {
      try {
        const response = await editTask(task?.id?? "", formValues);
        if (response.status === 201 || response.status === 200) {
          toast.success("Tarefa editada com sucesso!");
          router.push("/home");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Erro ao editada tarefa.");
      }
    };
  
    return (
        <div>
        <div className="head">
          <div className="leftSide">
            <h1 className="title">Editar usuário</h1>
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
  
        <div className="text_area">
          
          <TextField
                id="outlined-basic"
                label="Nome"
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
  
        <div className="row_1">
          <div className="leftSide1">
            <TextField
              id="outlined-basic"
              label="Email"
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
              name="description"
              value={formValues.description}
              onChange={handleChangeInput}
            />
          </div>
          <div className="rightSide1">
          <FormControl sx={{ 
                    m: 1, 
                    width: '22ch',  
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
                    }, }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{color: "#0A6B1A !important"}} name="senha">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              sx={{ 
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
              }}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="senha"
            />
          </FormControl>
            
          </div>
        </div>
      </div>
    );
}

const EditTask: React.FC = () => {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <EditUserContent />
    </Suspense>
  );
}

export default EditTask