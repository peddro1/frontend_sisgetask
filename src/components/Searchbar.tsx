'use client';
import * as React from 'react'
import "../styles/Searchbar.css";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, TextField } from '@mui/material'

export default function Searchbar() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <div className="searchbar">
            <div className='leftSide'>
                <Box sx={{ minWidth: 300 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"
                            sx={{
                                color: '#0A6B1A', // cor padrão da label
                                '&.Mui-focused': {
                                color: '#0A6B1A', // cor quando está focada
                                },
                            }}
                        >Tipo de busca</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Tipo de busca"
                            onChange={handleChange}
                            sx={{
                            backgroundColor: '#F0FFF0', // cor de fundo
                            color: '#0A6B1A',            // cor do texto
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0A6B1A',   // borda normal
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0A6B1A',   // borda ao focar
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0A6B1A',   // borda ao passar o mouse
                            },
                            '.MuiSvgIcon-root': {
                                color: '#0A6B1A',         // cor do ícone (setinha)
                            },
                            }}

                        >
                            <MenuItem value={10}>ID</MenuItem>
                            <MenuItem value={20}>Título</MenuItem>
                            <MenuItem value={30}>Status</MenuItem>
                            <MenuItem value={40}>Data</MenuItem>
                        </Select>
                        
                    </FormControl>
                </Box>
            </div>
            <div className='rightSide'>
            <TextField  id="outlined-basic" className="search_box" label="Buscar tarefa" variant="outlined" fullWidth 
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
        </div>
    )
}
 