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
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { editUser, getUserById, UserResponse } from "../services/userService";

function EditUserContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [user, setUser] = useState<UserResponse>();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(userId ?? "");
      setUser(data);
      setFormValues((prev) => ({
        ...prev,
        first_name: data.first_name,
        email: data.email,
      }));
    };

    fetchUser();
  }, []);

  const [formValues, setFormValues] = React.useState<UserFormData>({
    first_name: "",
    email: "",
    is_active: true,
    password: "",
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
      const response = await editUser(user?.id ?? "", formValues);
      if (response.status === 201 || response.status === 200) {
        toast.success("Usuário editado com sucesso.");
        router.push("/users");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Erro ao editar usuário.");
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
          name="first_name"
          value={formValues.first_name}
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
            name="email"
            value={formValues.email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="rightSide1">
          <FormControl
            sx={{
              m: 1,
              width: "22ch",
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
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: "#0A6B1A !important" }}
              name="password"
            >
              Senha
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
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
              value={formValues.password}
              onChange={handleChangeInput}
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
};

export default EditTask;
