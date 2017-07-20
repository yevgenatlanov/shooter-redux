const ammoBox = (state = 15, action) => {
    switch(action.type) {
        case 'DECREMENT_AMMO':
            return action.payload
        default:
            return state
    }     
};

export { ammoBox };