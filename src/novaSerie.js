import React, { useState } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovaSerie = () => {
    const [name, setname] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt => {
        setname(evt.target.value)
    }

    const save = () => {
        Axios.post('/api/series', {
            name: name
        })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return <Redirect to='/Series' />
    }

    return (
        <div className='container'>
            <h1 className='mt-3 mb-2 text-center'>Nova Série</h1>
            <form>
                <div className='form-group'>
                    <label htmlfor="name">Nome da Série</label>
                    <input type="text" value={name} className='form-control' id='name'
                        onChange={onChange}
                        placeholder="Digite o nome da série" />
                    <button type='button' onClick={save} className='btn btn-primary mt-3'>Adicionar</button>
                </div>
            </form>
        </div>
    )
}

export default NovaSerie;