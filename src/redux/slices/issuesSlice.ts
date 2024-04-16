import { createSlice } from "@reduxjs/toolkit";

interface Issue {
  id: number;
  title: string;
  number: number;
  state: string;
  user: {
    login: string;
  };
  comments: number;
  created_at: string;
}

interface Repo {
  id: number | null;
  html_url: string;
}

const initialState: { issues: Issue[]; repo: Repo } = {
  issues: [],
  repo: {
    id: null,
    html_url: "",
  },
};

export const issuesSlice = createSlice({
  name: "issues",
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
          if (action.payload.board.name === "In Progress") {
            issue.state = "open";
          }
          if (action.payload.board.name === "Done") {
            issue.state = "closed";
          }
          return issue;
        }
        return issue;
      });
    },
  },
});

export default issuesSlice.reducer;
