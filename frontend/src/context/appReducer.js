export const initialState = {
    toasts: [],
    sidebarCollapsed: false,
};

export function appReducer(state, action) {
    switch (action.type) {
        case 'ADD_TOAST':
            return { ...state, toasts: [...state.toasts, action.payload] };
        case 'REMOVE_TOAST':
            return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };
        case 'TOGGLE_SIDEBAR':
            return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
        default:
            return state;
    }
}
