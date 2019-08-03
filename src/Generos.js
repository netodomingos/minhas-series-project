import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';


const Generos = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        Axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    // Deletar o genero
    const deleteGenero = id => {
        Axios
            .delete('/api/genres/' + id)
            .then(res => {
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
            })
    }

    // Renderizar tabela
    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Excluir</button>
                    <button className='btn btn-warning ml-3'>
                        <Link className='text-dark text-decoration-none' to={'/generos/' + record.id}>Editar</Link>
                    </button>
                </td>
            </tr>
        )
    }

    // Alert
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1 className='mt-3 mb-3 text-center'>Genêros</h1>
                <div className='alert alert-danger text-center' role='alert'>
                    Você não tem Genêros adicionados.
                    </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3 text-center'>Genêros</h1>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col' className='ml-4'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderLine)}
                </tbody>
            </table>
            <button className='btn btn-primary'>
                <Link to='/generos/novo' className='text-white text-decoration-none'>Adicionar novo Genêro</Link>
            </button>

        </div>
    )
}

export default Generos;