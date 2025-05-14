"use client";

import "../../styles/Home.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Tableusers from "@/components/Tableusers";
import Searchbarusers from "@/components/Searchbarusers";

const Users: React.FC = () => {
  const router = useRouter();
 
  return (
    <main>
      <div className="head">
        <div className="leftSide">
          <h1 className="title">Usuários do sistema</h1>
        </div>
        <div className="rightSide">
          <Button
            variant="contained"
            className="btn_new_task"
            onClick={() => router.push("/new-user")}
          >
            <strong> Novo usuário</strong>
          </Button>
        </div>
      </div>
      <div className="table">
        <Searchbarusers />
      </div>
      <div className="table">
        <Tableusers />
      </div>
    </main>
  );
};

export default Users;
