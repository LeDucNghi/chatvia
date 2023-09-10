import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

export interface ICustomAccordionProps {
  panelOrder: string;
  title: string;

  preprendIcon?: string | React.ReactNode;
  appendIcon?: string | React.ReactNode;
  children: React.ReactNode;
  expandIcon?: React.ReactNode;
}

export function CustomAccordion({
  title,
  children,
  expandIcon,
  preprendIcon,
  appendIcon,
  panelOrder,
}: ICustomAccordionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === panelOrder}
      onChange={handleChange(panelOrder)}
    >
      <AccordionSummary
        expandIcon={expandIcon ? expandIcon : <ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "50%", flexShrink: 0 }}>
          {" "}
          {preprendIcon} {title} {appendIcon}{" "}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
