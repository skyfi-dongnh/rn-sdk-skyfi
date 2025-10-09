namespace Modal {
	interface ModalRenderProps<T = unknown> {
		close(): void;
		done(data: T): void | Promise<any>;
	};

	interface ModalOptions<T = unknown> {
		modalId: string;
		render: React.ReactNode | React.ComponentType<ModalRenderProps<T>>;
		onClose?(): void;
		onDone?(data: T): void | Promise<any>;
		closeButton?: boolean;
		typeModal?: 'modal' | 'bottom-sheet';
		props?: Omit<BaseModalProps, 'visible'> | Omit<BottomSheetProps, 'visible'>;
	};

	interface BaseModalProps {
		visible: boolean;
		children: React.ReactNode;
		closeOnBackdrop?: boolean;
		animationType?: 'none' | 'slide' | 'fade';
	}
	interface BottomSheetProps {
		visible: boolean;
		children: React.ReactNode;
		closeOnBackdrop?: boolean;
		maxHeight?: number;
	}

	type PropsModal = Omit<BaseModalProps, 'visible'> | Omit<BottomSheetProps, 'visible'>;

	type BaseModal = Omit<BaseModalProps, 'visible'>
	type BottomSheet = Omit<BottomSheetProps, 'visible'>

	interface ModalProps {
		typeModal: 'modal' | 'bottom-sheet';
		content: React.ReactNode; visible: boolean;
		props?: PropsModal;
	}

	interface ModalProps {
		typeModal: 'modal' | 'bottom-sheet';
		content: React.ReactNode; visible: boolean;
		props?: PropsModal;
	}
	interface useModalType extends ModalOptions<T> {
		close(): void;
		done(data: T | unknown): void | Promise<T>;
	};
}
export default Modal;