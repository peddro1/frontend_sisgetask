import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/Tablehome.css";
import {
  deleteTaskByID,
  getTasks,
  TaskResponse,
} from "@/app/services/taskService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "../../node_modules/next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import {
  deleteUserByID,
  getUsers,
  UserResponse,
} from "@/app/services/userService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TablehomeProps {
  users: UserResponse[];
}

export default function Tableusers() {
  const router = useRouter();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await deleteUserByID(id);
      if (response.status === 204) {
        toast.success("Usuário excluído com sucesso!");
      } else {
        toast.error(response.message);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <TableContainer component={Paper} className="table_comp">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow className="header">
            <StyledTableCell>
              <strong>Nome</strong>{" "}
            </StyledTableCell>
            <StyledTableCell align="right">
              <strong>Email</strong>{" "}
            </StyledTableCell>
            <StyledTableCell align="right">
              <strong>Perfil</strong>{" "}
            </StyledTableCell>
            <StyledTableCell align="right">
              <strong>Status</strong>{" "}
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.first_name}
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  {user.is_active}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  {user.is_active ? "Ativo" : "Inativo"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    style={{
                      all: "unset", // limpa quase tudo
                      cursor: "pointer", // adiciona o cursor de botão
                    }}
                    onClick={() => {
                      router.push("/edit-user?id=" + user.id);
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    style={{
                      all: "unset", // limpa quase tudo
                      cursor: "pointer", // adiciona o cursor de botão
                    }}
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                  <DeleteModal
                    open={isModalOpen}
                    onClose={() => {
                      closeModal();
                    }}
                    onConfirm={() => {
                      deleteUser(user.id);
                    }}
                  ></DeleteModal>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={5} align="center">
                Nenhum usuário encontrado.
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
