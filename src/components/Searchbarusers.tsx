'use client';
import * as React from 'react'
import "../styles/Tablehome.css";
import {  SelectChangeEvent,TextField } from '@mui/material'

export default function Searchbarusers() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
      
            
        <div className=' margin_20 table_comp'>
        <TextField  id="outlined-basic" className="margin_20" label="Buscar por email" variant="outlined" fullWidth 
            sx={{
                input: {
                color: '#0A6B1A', // texto digitado
                },
                label: {
                color: '#0A6B1A', // cor da label
                },
                '& label.Mui-focused': {
                color: '#0A6B1A', // cor da label quando focada
                },
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#0A6B1A', // borda normal
                },
                '&:hover fieldset': {
                    borderColor: '#0A6B1A', // borda ao passar o mouse
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#0A6B1A', // borda ao focar
                },
                },
            }}
            />
        </div>
    )
}
 