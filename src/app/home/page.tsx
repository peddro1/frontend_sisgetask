"use client";

import "../../styles/Home.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Searchbar from "@/components/Searchbar";
import Tablehome from "@/components/Tablehome";
import React from "react";

const Home: React.FC = () => {
  const router = useRouter();
 
  return (
    <main>
      <div className="head">
        <div className="leftSide">
          <h1 className="title">Tarefas</h1>
        </div>
        <div className="rightSide">
          <Button
            variant="contained"
            className="btn_new_task"
            onClick={() => router.push("/new-task")}
          >
            <strong> Nova tarefa</strong>
          </Button>
        </div>
      </div>
      <div className="search_bar">
        <Searchbar />
      </div>
      <div className="table">
        <Tablehome />
      </div>
    </main>
  );
};

export default Home;
