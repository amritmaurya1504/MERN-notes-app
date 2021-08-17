export const setUserDetails = (data) => {
    return {
        type: "SET_USER",
        payload: {
            data: data
        }
    }
}
export const logout = () => {
    return {
        type: "LOGOUT_USER",
    }
}

export const getNotes = (data) => {
    return {
        type: "SET_NOTES",
        payload : {
            data: data
        }
    }
}
