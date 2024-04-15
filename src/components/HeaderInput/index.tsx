import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  Button,
  Form
} from "react-bootstrap";

import { issuesSlice } from "../../redux/slices/issuesSlice";
import { 
  generateAboutUrl,
  generateIssuesUrl
} from "../../helpers";

const HeaderInput = () => {
  const dispatch = useDispatch();
  const { loadIssues, loadRepoInfo } = issuesSlice.actions;

  const [input, setInput] = useState("");

  async function loadFromApi(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const issuesUrl = generateIssuesUrl(input);
      const aboutUrl = generateAboutUrl(input);

      const res = await Promise.all([fetch(issuesUrl), fetch(aboutUrl)]);
      const data = await Promise.all(res.map((r) => r.json()));

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
      console.error(error);
    }
  }

  return (
    <form
      className="d-flex"
      onSubmit={(e) => loadFromApi(e)}
    >
      <Form.Control
        size="sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter repo url"
      />
      <Button
        variant="secondary"
        className="ms-1 text-nowrap"
        type="submit"
        size="sm"
      >
        Load issues
      </Button>
    </form>
  );
}

export default HeaderInput;