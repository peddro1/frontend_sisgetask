import api from "../configs/api";
import { AxiosError } from "axios";

export interface UserResponse {
  id: string;
  email: string;
  first_name: string;
  is_active: string;
}

export const createUser = async (
  formData: UserFormData
): Promise<{ status: number; message: string }> => {
  const userPayload = {
    first_name: formData.first_name,
    password: formData.password,
    email: formData.email,
    is_active: formData.is_active,
  };

  try {
    const response = await api.post("/users/", userPayload);
    return {
      status: response.status,
      message: "Usuário criado com sucesso",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data?.message || "Erro na criação do usuário",
      };
    } else if (err.request) {
      return {
        status: 500,
        message: "Erro de conexão com o servidor",
      };
    } else {
      return {
        status: 500,
        message: "Erro inesperado ao criar usuário",
      };
    }
  }
};

export const getUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await api.get<UserResponse[]>("/users/", {
      params: {},
    });

    const users: UserResponse[] = response.data.map((user) => ({
      first_name: user.first_name,
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    }));

    return users;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao buscar usuários:", err.message);
    return [];
  }
};

export const getUserById = async (id: string): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>("/users/" + id + "/", {
      params: {},
    });

    const user: UserResponse = response.data;

    return user;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao buscar usuário:", err.message);
    return {
      id: "",
      name: "",
      description: "",
      start_date: "",
      updated_at: "",
      end_date: "",
      status: "",
    };
  }
};

export const editUser = async (
  id: string,
  formData: UserFormData
): Promise<{ status: number; message: string }> => {
  const userPayload = {
    first_name: formData.first_name,
    email: formData.email,
  };

  try {
    const response = await api.patch("/users/" + id + "/", userPayload);
    return {
      status: response.status,
      message: "Usuário editado com sucesso",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data?.message || "Erro na edição do usuário",
      };
    } else if (err.request) {
      return {
        status: 500,
        message: "Erro de conexão com o servidor",
      };
    } else {
      return {
        status: 500,
        message: "Erro inesperado ao editar usuário",
      };
    }
  }
};

export const deleteUserByID = async (
  id: string
): Promise<{ status: number; message: string }> => {
  try {
    const response = await api.delete("/users/" + id + "/", {
      params: {},
    });
    return {
      status: response.status,
      message: "Usuário deletado com sucesso",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data?.message || "Erro ao deletar usuário",
      };
    } else if (err.request) {
      return {
        status: 500,
        message: "Erro de conexão com o servidor",
      };
    } else {
      return {
        status: 500,
        message: "Erro inesperado ao deletar usuário",
      };
    }
  }
};
