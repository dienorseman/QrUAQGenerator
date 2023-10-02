import { useContext, useState } from 'react';

import { UserContext } from '../context/UserContext';

import styles from './InicioSesionModal.module.css';
import axios from 'axios';

export const InicioSesionModal = () => {
    const { user, setUser } = useContext(UserContext);

    const [modalState, setModalState] = useState({
        error: false,
        loading: false,
        show: true,
    });

    const [formState, setFormState] = useState({
        studentId: '',
        password: '',
    });

    const [passwordInputState, setPasswordInputState] = useState({
        type: 'password',
        url: '/ojo.svg',
        shown: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        setModalState({
            ...modalState,
            error: false,
            loading: true,
        });
        if (formState.email !== '') {
            setModalState({
                ...modalState,
                loading: true,
            });
            let formData = new FormData();
            formData.append('expediente', formState.studentId);
            formData.append('password', formState.password);
            await axios(
                {
                    method: 'post',
                    url: 'http://148.220.52.101/api/portal/login/',
                    headers: {
                        'Content-Type': 'multipart/form-data'  
                    },
                    data: formData,
                }
            )
                .then((response) => {
                    setUser({
                        ...user,
                        logged: true,
                        name: response.data.nombre,
                        plan: response.data.plan,
                        studentId: response.data.expediente,
                    });
                    setModalState({
                        ...modalState,
                        show: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setModalState({
                        ...modalState,
                        error: true,
                        loading: false,
                    });
                });
        }
    };

    const onInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const showPassword = () => {
        if (passwordInputState.shown) {
            setPasswordInputState({
                type: 'password',
                url: '/ojo.svg',
                shown: false,
            });
        } else {
            setPasswordInputState({
                type: 'text',
                url: '/ojo-abierto.svg',
                shown: true,
            });
        }
    };

    const handleReset = () => {
        setModalState({
            ...modalState,
            show: !modalState.show,
        });
    };

    return (
        <div className={styles.inicioSesionModal}>
            <div className={styles.modalEncabezado}>
                <img src="/UAQ.svg" alt="" />
                <h1 className={styles.modalTitulo}>Bienvenido</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalFormulario}>
                <div className={styles.modalFormulario__input}>
                    <label>Expediente</label>
                    <input
                        type="text"
                        placeholder="123456"
                        onChange={onInputChange}
                        name="studentId"
                        value={formState.stidentID}
                    />
                </div>
                <div className={styles.modalFormulario__input}>
                    <label>Contraseña</label>
                    <div>
                        <input
                            type={passwordInputState.type}
                            placeholder="********"
                            onChange={onInputChange}
                            name="password"
                            value={formState.password}
                        />
                        <button type="button" onClick={showPassword}>
                            <img src={passwordInputState.url} alt="ojo-icono" />
                        </button>
                    </div>
                </div>
                {modalState.error && (
                    <div className={styles.error}>
                        <div>
                            <img src="/error.svg" alt="" />
                        </div>
                        <p>Contraseña incorrecta</p>
                    </div>
                )}
            </form>

            <div className={styles.modalBotones}>
                <button
                    className={styles.inicioSesionBoton}
                    onClick={handleSubmit}
                >
                    {modalState.loading ? (
                        <img className={styles.loading} src="loading.svg" />
                    ) : (
                        'Iniciar sesión'
                    )}
                </button>
                <button className={styles.recuperarBoton} onClick={handleReset}>
                    ¿Olvidaste tu contraseña?
                </button>
            </div>
        </div>
    );
};
