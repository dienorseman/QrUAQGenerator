import { useState } from 'react';
import styles from './InicioSesionModal.module.css';

export const RecuperarModal = ({ daddyState, setDaddyState }) => {
    const [modalState, setModalState] = useState({
        error: false,
        loading: false,
        code: false,
    });

    const [passwordInputState, setPasswordInputState] = useState({
        type: 'password',
        url: '/ojo.svg',
        shown: false,
    });

    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        setModalState({
            ...modalState,
            loading: true,
        });
        setTimeout(() => {
            setModalState({
                error: false,
                loading: false,
                code: '123444',
            });
        }, 2000);
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        setModalState({
            ...modalState,
            loading: true,
        });
        setTimeout(() => {
            setModalState({
                ...modalState,
                error: true,
                loading: false,
            });
        }, 2000);
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

    const closeModal = () => {
        setDaddyState({
            ...modalState,
            show: !daddyState.show,
        });
    };

    return (
        <div className={styles.recuperacionModal}>
            <div className={styles.modalCerrarContenedor}>
                <button className={styles.modalCerrar} onClick={closeModal}>
                    <img src="/cerrar.svg" alt="" />
                </button>
            </div>
            <div className={styles.modalEncabezado}>
                <img src="/UAQ.svg" alt="" />
                <h1 className={styles.modalTitulo}>Recuperar Contraseña</h1>
            </div>

            {!modalState.code ? (
                <form
                    onSubmit={handleSubmit1}
                    className={styles.modalFormulario}
                >
                    <div className={styles.modalFormulario__info}>
                        <h2>Enviamos un codigo al correo </h2>
                        <p>mail@mail.com</p>
                    </div>
                    <div className={styles.modalFormulario__input}>
                        <label>Código</label>
                        <div>
                            <input type={passwordInputState.type} />
                        </div>
                    </div>
                    {modalState.error && (
                        <div className={styles.error}>
                            <div>
                                <img src="/error.svg" alt="" />
                            </div>
                            <p>Las contraseñas no coinciden</p>
                        </div>
                    )}
                </form>
            ) : (
                <form
                    onSubmit={handleSubmit2}
                    className={styles.modalFormulario}
                >
                    <div className={styles.modalFormulario__input}>
                        <label>Nueva Contraseña</label>
                        <div>
                            <input type={passwordInputState.type} />
                            <button type="button" onClick={showPassword}>
                                <img
                                    src={passwordInputState.url}
                                    alt="ojo-icono"
                                />
                            </button>
                        </div>
                    </div>
                    <div className={styles.modalFormulario__input}>
                        <label>Repetir Contraseña</label>
                        <div>
                            <input type={passwordInputState.type} />
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
                            <p>Las contraseñas no coinciden</p>
                        </div>
                    )}
                </form>
            )}

            <div className={styles.modalBoton}>
                <button
                    className={styles.inicioSesionBoton}
                    onClick={modalState.code ? handleSubmit2 : handleSubmit1}
                >
                    {modalState.loading ? (
                        <img className={styles.loading} src="loading.svg" />
                    ) : modalState.code ? (
                        'Actualizar Contraseña'
                    ) : (
                        'Cofirmar'
                    )}
                </button>
            </div>
        </div>
    );
};
