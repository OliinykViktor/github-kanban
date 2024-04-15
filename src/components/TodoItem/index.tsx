import { Card } from "react-bootstrap";
import React from "react";

import { formatTimeAgo } from "../../helpers";

interface TodoItemProps {
  title: string;
  number: number;
  login: string;
  comments: number;
  created: string;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onDragStart: React.DragEventHandler<HTMLDivElement>;
  onDragEnd: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  title,
  number,
  login,
  comments,
  created,
  onDragOver,
  onDragLeave,
  onDragStart,
  onDragEnd,
  onDrop,
}) => {
  const date = formatTimeAgo(created);
  return (
    <Card
      className="m-1 bg-secondary "
      draggable
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      style={{cursor:"pointer"}}
    >
      <p className="position-absolute top-0 end-0 p-2 text-white">
        #{number}
      </p>
      <h2 className="h5 text-white">
        {title}
      </h2>
      <p className="text-white">
        {date}
      </p>
      <div className="d-flex">
        <p className="text-white">
          {login}
        </p>
        <span className="mx-1 text-white">|</span>
        <p className="text-white">
          Comments: {comments}
        </p>
       </div>
    </Card>
  );
}

export default TodoItem;
