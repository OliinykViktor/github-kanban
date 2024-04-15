import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/rootStore";
import { NavLink } from "react-bootstrap";

interface RepoInfo {
  id: number;
  owner: {
    html_url: string;
    login: string;
  };
  clone_url: string;
  name: string;
  stargazers_count: number;
}

const RepoInfo: React.FC = () => {
  const repoInfo: RepoInfo = useSelector((state: RootState) => state.issues.repo);

  return (
    <>
      {repoInfo.id > 0 && (
        <div className="d-flex mt-2">
          <NavLink
            href={repoInfo.owner.html_url}
            target="_blank"
            rel="noreferrer"
          >
            {repoInfo.owner.login}
          </NavLink>
          <span className="h5 mx-1">{">"}</span>
          <NavLink
            href={repoInfo.clone_url}
            target="_blank"
            rel="noreferrer"
          >
            {repoInfo.name}
          </NavLink>
          <span className="ms-4">
            &#9733; {Math.round(repoInfo.stargazers_count / 1000)} K stars
          </span>
        </div>
      )}
    </>
  );
}

export default RepoInfo;
