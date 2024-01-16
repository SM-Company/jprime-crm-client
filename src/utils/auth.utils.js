const roles = {
    ADMIN: {
        id: 1,
        name: 'ADMIN'
    },
    CLIENT: {
        id: 2,
        name: 'CLIENT'
    },
}

const authUtils = {
    user() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) return user
        return false;
    },

    role() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role && user.role.code) {
            return roles[user.role.code];
        }
        return false;
    }
}

export default authUtils

export { roles }