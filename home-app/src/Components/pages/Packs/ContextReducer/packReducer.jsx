// initial the view states
export const initialState = {
    /**
     * packgeInfo will contain:
     *  - package id
     *  - price
     *  - title
     *  - content
     *  - ad adding value
     *  - life cycle
     */
    packgeInfo: [],
};

const packReducer = (state, action) => {
    const { type , payload } = action;

    switch (type) {
        case "ADD_TO_PACKS":
            return {
                ...state,
                packgeInfo: payload.packInfo,
            };
        
        case "CLEAR_PACKS_LIST":
            return initialState;

        default:
            // only for devs
            throw new Error(`No case for type ${type} in pack reducer`);
    }
}

export default packReducer;