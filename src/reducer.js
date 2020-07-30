export const UPDATE_TEXT = "UPDATE_TEXT";
export const NEW_BLOCK = "NEW_BLOCK";

export const initialState = {
    foo: 'foo',

    allComponents: [
        {id: '123', name: 'blockly'},
    ]
};

export const updateBlockText = (content, id) => ({
    type: UPDATE_TEXT,
    payload: { content, id }
});

export const newBlock = (content, id) => ({
    type: NEW_BLOCK,
    payload: { content, id }
});

export default function(state = initialState, action) {
    console.log('reducer: ' + action.type);
    switch (action.type) {
        case UPDATE_TEXT: {
            const { content, id } = action.payload;
            console.log('reducer id: ' + id);
            return {
                ...state,
                allComponents: [
                    ...state.allComponents.filter(c => c.id !== id),
                    {id: id , name: content}
                ]
            };
        }
        case NEW_BLOCK: {
            const { content, id } = action.payload;

            return {
                ...state,
                allComponents: [
                    ...state.allComponents,
                    {id: id , name: content}
                    ]

            };
        }
        default:
            return state;
    }
}
