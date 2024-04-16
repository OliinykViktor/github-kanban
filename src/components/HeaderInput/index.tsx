import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import { issuesSlice } from "../../redux/slices/issuesSlice";
import {
  generateAboutUrl,
  generateIssuesUrl
} from "../../helpers";
import InfoBlock from "../InfoBlock";

const HeaderInput: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const { loadIssues, loadRepoInfo } = issuesSlice.actions;

  async function loadFromApi(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const issuesUrl = generateIssuesUrl(input);
      const aboutUrl = generateAboutUrl(input);

      const res = await Promise.all([fetch(issuesUrl), fetch(aboutUrl)]);
      const data = await Promise.all(res.map((r) => r.json()));
      console.log(data);

      if (sessionStorage.getItem(data[1].html_url)) {
        dispatch(
          loadIssues(
            JSON.parse(sessionStorage.getItem(data[1].html_url)!)
          )
        );
      } else {
        dispatch(loadIssues(data[0]));
      }
      dispatch(loadRepoInfo(data[1]));
      setInput("");
    } catch (error) {
      setErrorMsg("It seems that something went wrong.");
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    }
  }

  return (
    <>
      <form
        className="d-flex"
        onSubmit={(e) => loadFromApi(e)}
      >
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip 
              id="tooltip"
              className="position-absolute"
            >
              The primary request limit for unauthenticated users is 60 requests per hour
            </Tooltip>
          }
        >
          <Form.Control
            size="sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter repo url"
          />
        </OverlayTrigger>
        <Button
          variant="secondary"
          className="ms-1 text-nowrap"
          type="submit"
          size="sm"
        >
          Load issues
        </Button>
      </form>
      <InfoBlock
        isHidden={!errorMsg}
        msg={errorMsg}
        variant="danger"
      />
    </>
  );
}

export default HeaderInput;