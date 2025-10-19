import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Modal from "../../types/modal";
import { BaseModal } from '../modals/modalBase/BaseModal';
import { BottomSheet } from '../modals/modalBase/BottomSheet';



let eventManager: Map<string, Modal.ModalOptions> = new Map();
let listeners: Set<() => void> = new Set();

function randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function notifyListeners() {
    listeners.forEach(listener => listener());
}

function dispatchModal<T = unknown>(options: Omit<Modal.ModalOptions<T>, 'modalId' | 'close' | 'done'> & { modalId?: string }) {
    const id = options.modalId || randomId();
    eventManager.set(id, { ...options, modalId: id });
    notifyListeners();
}
function modal(options: Modal.ModalOptions) {
    return dispatchModal(options);
}

modal.open = dispatchModal;

modal.showBottomSheet = function <T = unknown>(options: Omit<Modal.ModalOptions<T>, 'typeModal' | 'modalId'> & { modalId?: string }) {
    return dispatchModal<T>({ ...options, typeModal: 'bottom-sheet' });
}
const ModalContext = createContext<Modal.useModalType>({} as Modal.useModalType);

const useModal = () => useContext(ModalContext);

const ModalProvider = () => {
    const [modalIds, setModalIds] = useState<Record<string, boolean>>({})
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const modalRender = useRef(new Map<string, { content: React.ReactNode; data: Modal.useModalType }>()).current;

    useEffect(() => {
        // Subscribe to modal changes
        const listener = () => {
            setUpdateTrigger(prev => prev + 1);
        };
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    }, []);

    const removeModal = useCallback((modalId?: string) => {
        if (modalId == null) {
            setModalIds({});
        } else {
            setModalIds((state) => {
                const { [modalId]: remove, ...newState } = state;
                return newState;
            });
            modalRender.delete(modalId);
        }
    }, [modalRender]);

    const isNotValid = useCallback(
        (options: Modal.ModalOptions) => {
            return modalRender.has(options.modalId);
        },
        [modalRender]
    );

    const appendModal = useCallback(
        (content: React.ReactNode, modalProps: Modal.useModalType) => {
            const { modalId } = modalProps;
            modalRender.set(modalId, { content, data: modalProps });
            setModalIds((state) => ({ ...state, [modalId]: true }));
        },
        [modalRender]
    );

    const buildModal = useCallback(
        (options: Modal.ModalOptions) => {
            const newOptions = Object.assign({}, { ...options });
            if (isNotValid(newOptions)) return;

            const Render = newOptions.render;
            const modalRenderProps = {
                close() {
                    newOptions.onClose?.();
                    removeModal(newOptions.modalId);
                    eventManager.delete(newOptions.modalId);
                },
                async done(data: unknown) {
                    if (newOptions.onDone) await newOptions.onDone(data);
                    removeModal(newOptions.modalId);
                    eventManager.delete(newOptions.modalId);

                }
            };
            const modalProps: Modal.useModalType = {
                ...newOptions,
                ...modalRenderProps
            };
            const content = typeof Render === 'function' ? <Render {...modalRenderProps} /> : Render;
            appendModal(content, modalProps);
        },
        [appendModal, isNotValid, removeModal]
    );

    useEffect(() => {
        if (eventManager.size > 0) {
            eventManager.forEach((options) => {
                buildModal(options);
            });
        }
    }, [updateTrigger, buildModal]);

    // AppModal component for default modal type
    const AppModal = ({ children, visible, props }: { children: React.ReactNode; visible: boolean; props?: Modal.BaseModal }) => {
        return (
            <BaseModal visible={visible} {...props}>
                {children}
            </BaseModal>
        );
    }

    const renderModal = ({ typeModal, content, visible, props }: Modal.ModalProps) => {

        switch (typeModal) {
            case 'bottom-sheet':
                return (
                    <BottomSheet visible={visible} {...(props as Modal.BottomSheet)} >
                        {content}
                    </BottomSheet>
                );
            case 'modal':
            default:
                return (
                    <AppModal visible={visible} props={props} >
                        {content}
                    </AppModal>
                );
        }
    };

    return (
        <>
            {Array.from(modalRender.values()).map(({ content, data: props }) => {
                const isVisible = modalIds[props.modalId] || false;


                return (
                    <ModalContext.Provider key={props.modalId} value={props}>
                        {renderModal({ typeModal: props.typeModal || 'modal', content, visible: isVisible, props: props.props })}
                    </ModalContext.Provider>
                );
            })}
        </>
    );
};

export { modal, ModalProvider, useModal };
export default ModalProvider;