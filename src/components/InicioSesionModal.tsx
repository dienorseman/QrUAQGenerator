import { useContext, useState } from 'react';

import { UserContext } from '../context/UserContext';

import styles from './InicioSesionModal.module.css';
import axios from 'axios';

export const InicioSesionModal = () => {

    const context = useContext(UserContext);

    type FormStateType = {
        studentId: string;
        password: string;
    };

    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }

    const { user, setUser } = context;


    const [modalState, setModalState] = useState({
        error: {
            status: false,
            message: '',
        },
        loading: false,
        show: true,
    });

    const [formState, setFormState] = useState<FormStateType>({
        studentId: '',
        password: '',
    });

    const [passwordInputState, setPasswordInputState] = useState({
        type: 'password',
        url: '/ojo.svg',
        shown: false,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (formState.studentId !== '') {
            setModalState({
                ...modalState,
                loading: true,
            });
            const formData = new FormData();
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
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    setModalState({
                        ...modalState,
                        error: {
                            status: true,
                            message: 'El expediente o la contraseña son incorrectos',
                        },
                        loading: false,
                    })
                });
        } else {
            setModalState({
                ...modalState,
                error: {
                    status: true,
                    message: 'El campo de expediente no puede estar vacío',
                },
                loading: false,
            });
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        value={formState.studentId}
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
                        <button type="button" onClick={showPassword} disabled={!modalState.loading}>
                            <img src={passwordInputState.url} alt="ojo-icono" />
                        </button>
                    </div>
                </div>
                {modalState.error.status && (
                    <div className={styles.error}>
                        <div>
                            <img src="/error.svg" alt="" />
                        </div>
                        <p>{modalState.error.message}</p>
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
