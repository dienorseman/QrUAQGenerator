import { useContext, useState } from 'react';

import { RecuperarModal } from './RecuperarModal';

import { UserContext } from '../context/UserContext';

import styles from './InicioSesionModal.module.css';

export const InicioSesionModal = () => {
    const { user, setUser } = useContext(UserContext);

    const [modalState, setModalState] = useState({
        error: false,
        loading: false,
        show: true,
    });

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const [passwordInputState, setPasswordInputState] = useState({
        type: 'password',
        url: '/ojo.svg',
        shown: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        setModalState({
            ...modalState,
            error: false,
            loading: true,
        });
        setTimeout(() => {
            setModalState({
                ...modalState,
                error: true,
                loading: false,
            });
        }, 2000);
        if (formState.email !== '') {
            setUser({
                ...user,
                logged: true,
                name: 'Juan',
                email: formState.email,
                studentId: '393456',
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

    if (modalState.show) {
        return (
            <div className={styles.inicioSesionModal}>
                <div className={styles.modalEncabezado}>
                    <img src="/UAQ.svg" alt="" />
                    <h1 className={styles.modalTitulo}>Bienvenido</h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={styles.modalFormulario}
                >
                    <div className={styles.modalFormulario__input}>
                        <label>Correo</label>
                        <input
                            type="text"
                            placeholder="mail@mail.com"
                            onChange={onInputChange}
                            name="email"
                            value={formState.email}
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
                                <img
                                    src={passwordInputState.url}
                                    alt="ojo-icono"
                                />
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
                    <button
                        className={styles.recuperarBoton}
                        onClick={handleReset}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <RecuperarModal
                daddyState={modalState}
                setDaddyState={setModalState}
            />
        );
    }
};
