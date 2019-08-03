import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const EditarGenero = ({ match }) => {
    const [name, setname] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        Axios
            .get('/api/genres/' + match.params.id)
            .then(res => {
                setname(res.data.name)
            })
    }, [match.params.id])

    const onChange = evt => {
        setname(evt.target.value)
    }

    const save = () => {
        Axios.put('/api/genres/' + match.params.id, {
            name: name
        })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1 className='mt-3 mb-2 text-center'>Editar Genêro</h1>
            <form>
                <div className='form-group'>
                    <label htmlfor="name">Nome do Genêro</label>
                    <input type="text" value={name} className='form-control' id='name'
                        onChange={onChange}
                        placeholder="Digite o Genêro" />
                    <button type='button' onClick={save} className='btn btn-primary mt-3'>Adicionar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarGenero;