"use client";

import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import "../../styles/Newtask.css";
import { createTask } from "../services/taskService";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { createUser } from "../services/userService";

const NewUser: React.FC = () => {
  const router = useRouter();

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

  const [formValues, setFormValues] = React.useState<UserFormData>({
    first_name: "",
    password: "",
    email: "",
    is_active: true,
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
      const response = await createUser(formValues);
      if (response.status === 201 || response.status === 200) {
        toast.success("Usuário criado com sucesso!");
        router.push("/users");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Erro ao criar usuário.");
    }
  };

  return (
    <div>
      <div className="head">
        <div className="leftSide">
          <h1 className="title">Novo usuário</h1>
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
              name="password"
              value={formValues.password}
              onChange={handleChangeInput}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
