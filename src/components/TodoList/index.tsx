import React, {
  useState,
  useEffect
} from "react";
import {
  useSelector,
  useDispatch
} from "react-redux";
import {
  Alert,
  Col
} from "react-bootstrap";

import { issuesSlice } from "../../redux/slices/issuesSlice";
import TodoItem from "../TodoItem";
import { RootState } from "../../redux/rootStore";

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

interface RepoInfo {
  id: number | null;
  html_url: string;
  message?: string;
}

const TodoList: React.FC = () => {
  const [boards, setBoards] = useState<{ name: string; items: Issue[] }[]>([
    { name: "All Todo", items: [] },
    { name: "In Progress", items: [] },
    { name: "Done", items: [] },
  ]);

  const allIssues: Issue[] = useSelector((state: RootState) => state.issues.issues);
  const repoInfo: RepoInfo = useSelector((state: RootState) => state.issues.repo);
  const { dragIssue } = issuesSlice.actions;
  const dispatch = useDispatch();

  const inProgressIssues = allIssues.filter((issue) => issue.state === "open");
  const doneIssues = allIssues.filter((issue) => issue.state === "closed");

  useEffect(() => {
    setBoards([
      { name: "All Todo", items: [...allIssues] },
      { name: "In Progress", items: [...inProgressIssues] },
      { name: "Done", items: [...doneIssues] },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIssues]);

  const [currentBoard, setCurrentBoard] = useState<{ name: string; items: Issue[] } | null>(null);
  const [currentItem, setCurrentItem] = useState<Issue | null>(null);

  const dragOverHandlerEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeaveHandler = () => { };

  const dragStartHandler = (board: { name: string; items: Issue[] }, item: Issue) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = () => { };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, board: { name: string; items: Issue[] }, item: Issue) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentItem && currentBoard) {
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
      const dropIndex = board.items.indexOf(item);
      board.items.splice(dropIndex + 1, 0, currentItem);

      setBoards((prevBoards) =>
        prevBoards.map((b) => {
          if (b.name === board.name) {
            return board;
          }
          if (b.name === currentBoard.name) {
            return currentBoard;
          }
          return b;
        })
      );

      dispatch(dragIssue({ currentItem, board }));
    }
  };

  const dropCardHandler = (board: { name: string; items: Issue[] }) => {
    if (currentItem && currentBoard) {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);

      setBoards((prevBoards) =>
        prevBoards.map((b) => {
          if (b.name === board.name) {
            return board;
          }
          if (b.name === currentBoard.name) {
            return currentBoard;
          }
          return b;
        })
      );

      dispatch(dragIssue({ currentItem, board }));
    }
  };

  useEffect(() => {
    if (repoInfo.id) {
      sessionStorage.setItem(repoInfo.html_url, JSON.stringify(allIssues));
    }
  }, [repoInfo, allIssues]);

  return (
    <div className="d-flex flex-row px-1 py-3">
      {
        repoInfo.message
        &&
        <Alert variant="light">
          Invalid URL
        </Alert>}
      {
        repoInfo.id &&
        boards.map((board) => (
          <Col
            md={4}
            key={board.name}
            className="bg-second"
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandlerEvent(e)}
            onDrop={() => dropCardHandler(board)}
          >
            <p className="h4">{board.name}</p>
            <div className="mt-2">
              {board.items.length ? (
                board.items.map((item) => (
                  <TodoItem
                    onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandlerEvent(e)}
                    onDragLeave={() => dragLeaveHandler()}
                    onDragStart={() => dragStartHandler(board, item)}
                    onDragEnd={() => dragEndHandler()}
                    onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
                    key={item.id}
                    title={item.title}
                    number={item.number}
                    login={item.user.login}
                    comments={item.comments}
                    created={item.created_at}
                  />
                ))
              ) : (
                <span>No todo</span>
              )}
            </div>
          </Col>
        ))}
    </div>
  );
};

export default TodoList;
