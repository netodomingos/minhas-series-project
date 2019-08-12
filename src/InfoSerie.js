import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])

    const [data, setData] = useState({})
    useEffect(() => {
        Axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id])

    useEffect(() => {
        Axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
            })
    }, [])


    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }


    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        Axios
            .put('/api/series/' + match.params.id, form)
            .then(res => {
                setSuccess(true)
            }, [])
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: ' rgba(0,0,0,0.7)' }}>

                    <div className='container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail mt-5' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='display-4 text-white'>{data.name}</h1>

                                <div className='lead text-white '>

                                    {data.status === 'ASSISTIDO' && <Badge color='success' className='mr-2'>Assistido</Badge>}

                                    {data.status === 'NAO_ASSISTIDO' && <Badge className='mr-2' color='warning'>Parado</Badge>}
                                    <div className='mt-2'>
                                        Gênero: {data.genre}
                                    </div>
                                </div>
                                <div>
                                    <button className='btn btn-primary mt-5' onClick={() => setMode('EDIT')}>
                                        Editar Série
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {
                mode === 'EDIT' &&

                < div className='container'>
                    <h1 className='mt-3 mb-2 text-center'>Editar Série</h1>
                    <form>
                        <div className='form-group'>
                            <label htmlfor="name">Nome da Série</label>
                            <input type="text"
                                value={form.name} className='form-control' id='name'
                                onChange={onChange('name')}
                                placeholder="Digite a série" />

                        </div>
                        <div className='form-group'>
                            <label htmlfor="name">Comentários</label>
                            <input type="text"
                                value={form.comments} className='form-control' id='name'
                                onChange={onChange('comments')}
                                placeholder="Faça seu comentário" />

                            <div className='form-group'>
                                <label for='name'>Gênero</label>
                                <select className='form-control'
                                    onChange={onChange('genre_id')}>
                                    {genres.map(genre => <option
                                        key={genre.id}
                                        value={genre.id}
                                        select={genre.id === form.genre}>
                                        {genre.name}
                                    </option>)}
                                </select>
                            </div>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='assistido' value='ASSISTIDO' onClick={seleciona('ASSISTIDO')} />
                            <label className='form-check-label' for='assistido'>Assistido</label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='naoAssistido' value='NAO_ASSISTIDO' onClick={seleciona('NAO_ASSISTIDO')} />
                            <label className='form-check-label' for='naoAssistido'>Não Assitido</label>
                        </div>
                        <button type='button'
                            onClick={save} className='btn btn-primary mt-4 mb-4'>Fazer Mudança
                            </button>

                        <button className='btn btn-danger mt-4 mb-4 ml-2' onClick={() => setMode('INFO')}>Cancelar Edição
                        </button>
                    </form>



                </div>
            }
        </div>
    )
}

export default InfoSerie;