import api from "../configs/api"; // Importa a instância do axios com a configuração
import { AxiosError } from "axios";

export interface TaskResponse {
  id: string;
  name: string;
  description: string;
  start_date: string;
  updated_at: string;
  end_date: string;
  status: string;
}

export const createTask = async (
  formData: TaskFormData
): Promise<{ status: number; message: string }> => {
  const contactPayload = {
    name: formData.name,
    description: formData.description,
    status: formData.status,
  };

  try {
    const response = await api.post("/tasks/", contactPayload);
    return {
      status: response.status,
      message: "Tarefa criada com sucesso",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data?.message || "Erro na criação da tarefa",
      };
    } else if (err.request) {
      return {
        status: 500,
        message: "Erro de conexão com o servidor",
      };
    } else {
      return {
        status: 500,
        message: "Erro inesperado ao criar contato",
      };
    }
  }
};

export const getTasks = async (): Promise<TaskResponse[]> => {
  try {
    const response = await api.get<TaskResponse[]>("/tasks/", {
      params: {},
    });

    const tasks: TaskResponse[] = response.data.map((contact) => ({
      id: contact.id,
      name: contact.name,
      description: contact.description,
      start_date: contact.start_date,
      updated_at: contact.updated_at,
      end_date: contact.end_date,
      status: contact.status,
    }));

    return tasks;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao buscar tarefas:", err.message);
    return [];
  }
};
