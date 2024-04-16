import React from "react";
import { Alert } from "react-bootstrap";

interface InfoBlock {
  msg: string | null;
  variant: string;
  isHidden: boolean
}

const InfoBlock: React.FC<InfoBlock> = ({
  msg,
  variant,
  isHidden
}) => (
  <Alert hidden={isHidden} variant={variant}>
    {msg}
  </Alert>
);

export default InfoBlock;