import { createSlice } from "@reduxjs/toolkit";

const initialState: { issues: any[]; repo: any } = {
    issues: [],
    repo: {}
};


export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        loadIssues(state, action) {
            state.issues = [...action.payload];
        },
        loadRepoInfo(state, action) {
            state.repo = action.payload;
        },
        dragIssue(state, action) {
            state.issues = state.issues.map((issue) => {
                if (issue.id === action.payload.currentItem.id) {
                    if (action.payload.board.name === 'In Progress') {
                        issue.state = 'open';
                    }
                    if (action.payload.board.name === 'Done') {
                        issue.state = 'closed';
                    }
                    return issue;
                }
                return issue;
            });
        },
    },
});

export default issuesSlice.reducer;