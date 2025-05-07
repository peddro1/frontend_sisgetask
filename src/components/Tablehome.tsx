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
import { deleteTaskByID, getTasks, TaskResponse } from "@/app/services/taskService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from "../../node_modules/next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  tasks: TaskResponse[];
}

export default function Tablehome() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };
  
  const deleteTask = async (id: string) => {
    try {
      const response = await deleteTaskByID(id);
      if (response.status === 204 ) {
        toast.success("Tarefa excluida com sucesso!");
      } else {
        toast.error(response.message);
      }
      fetchTasks();
    } catch (error) {
      toast.error("Erro ao excluir tarefa.");
    }
  };

  return (
    <TableContainer component={Paper} className="table_comp">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow className="header">
            <StyledTableCell>
              <strong>Todas as tarefas</strong>{" "}
            </StyledTableCell>
            <StyledTableCell align="right">
              <strong>Status</strong>{" "}
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <StyledTableRow key={task.id}>
                <StyledTableCell component="th" scope="row">
                  {task.name}
                </StyledTableCell>
                <StyledTableCell align="right">{task.status}</StyledTableCell>
                <StyledTableCell align="right"> 
                <button style={{
                  all: 'unset', // limpa quase tudo
                  cursor: 'pointer' // adiciona o cursor de botão
                }} onClick={ () => {
                  router.push("/edit-task?id=" + task.id)
                }}>
                  <EditIcon />
                </button>
                <button style={{
                  all: 'unset', // limpa quase tudo
                  cursor: 'pointer' // adiciona o cursor de botão
                }} onClick={ () => {
                  deleteTask(task.id)
                }}>
                  <DeleteIcon/>
                </button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                Nenhuma tarefa encontrada.
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
