import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BaseModal, BaseModalProps } from '../modals/modalBase/BaseModal';
import { BottomSheet, BottomSheetProps } from '../modals/modalBase/BottomSheet';


type ModalRenderProps<T = unknown> = {
    close(): void;
    done(data: T): void | Promise<any>;
};


type ModalOptions<T = unknown> = {
    modalId: string;
    render: React.ReactNode | React.ComponentType<ModalRenderProps<T>>;
    onClose?(): void;
    onDone?(data: T): void | Promise<any>;
    closeButton?: boolean;
    typeModal?: 'modal' | 'bottom-sheet';
    props?: Omit<BaseModalProps, 'visible'> | Omit<BottomSheetProps, 'visible'>;
};

type ModalProps = {
    typeModal: 'modal' | 'bottom-sheet';
    content: React.ReactNode; visible: boolean;
    props?: Omit<BaseModalProps, 'visible'> | Omit<BottomSheetProps, 'visible'>;
}

type useModalType = ModalOptions & {
    close(): void;
    done(data: unknown): void | Promise<any>;
};

let eventManager: Map<string, ModalOptions> = new Map();
let listeners: Set<() => void> = new Set();

function randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function notifyListeners() {
    listeners.forEach(listener => listener());
}

function dispatchModal<T = unknown>(options: Omit<ModalOptions<T>, 'modalId' | 'close' | 'done'> & { modalId?: string }) {
    const id = options.modalId || randomId();
    eventManager.set(id, { ...options, modalId: id });
    console.log('addmoda', eventManager.size);
    notifyListeners();
}
function modal(options: ModalOptions) {
    return dispatchModal(options);
}

modal.open = dispatchModal;

modal.showBottomSheet = function <T = unknown>(options: Omit<ModalOptions<T>, 'typeModal' | 'modalId'> & { modalId?: string }) {
    return dispatchModal<T>({ ...options, typeModal: 'bottom-sheet' });
}
const ModalContext = createContext<ModalOptions & useModalType>({} as ModalOptions & useModalType);

const useModal = () => useContext(ModalContext);

const ModalProvider = () => {
    const [modalIds, setModalIds] = useState<Record<string, boolean>>({})
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const modalRender = useRef(new Map<string, { content: React.ReactNode; data: ModalOptions & useModalType }>()).current;

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
        (options: ModalOptions) => {
            return modalRender.has(options.modalId);
        },
        [modalRender]
    );

    const appendModal = useCallback(
        (content: React.ReactNode, modalProps: ModalOptions & useModalType) => {
            const { modalId } = modalProps;
            modalRender.set(modalId, { content, data: modalProps });
            setModalIds((state) => ({ ...state, [modalId]: true }));
        },
        [modalRender]
    );

    const buildModal = useCallback(
        (options: ModalOptions) => {
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
                    setTimeout(() => {
                        removeModal(newOptions.modalId);
                        eventManager.delete(newOptions.modalId);
                    }, 0);
                }
            };
            const modalProps: ModalOptions & useModalType = {
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
    const AppModal = ({ children, visible, props }: { children: React.ReactNode; visible: boolean; props?: Omit<BaseModalProps, 'visible'> }) => (
        <BaseModal visible={visible} {...props}>
            {children}
        </BaseModal>
    );

    const renderModal = ({ typeModal, content, visible, props }: ModalProps) => {
        switch (typeModal) {
            case 'bottom-sheet':
                return (
                    <BottomSheet visible={visible} {...(props as Omit<BottomSheetProps, "visible">)} >
                        {content}
                    </BottomSheet>
                );
            case 'modal':
            default:
                return (
                    <AppModal visible={visible} {...(props as Omit<BaseModalProps, "visible">)} >
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