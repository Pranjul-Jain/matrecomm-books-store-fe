import t, { toast, useToasterStore } from 'react-hot-toast';

export const useToast = () => {
    const { toasts } = useToasterStore();

    function clearAllToast() {
        toasts
            .filter((tt) => tt.visible)
            .filter((_, i) => i === 0)
            .forEach((tt) => t.dismiss(tt.id));
    }

    function showToast(message, type) {
        clearAllToast();

        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        } else if (type === 'loading') {
            toast.loading(message);
        } else if (type === 'blank') {
            toast.blank(message);
        } else if (type === 'custom') {
            toast.custom(message);
        } else if (type === 'promise') {
            toast.promise(message);
        } else {
            toast.default(message);
        }
    }

    return { showToast };
};