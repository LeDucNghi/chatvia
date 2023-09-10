import "@/components/layouts/Dashboard/Dashboard.scss";

import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { Button } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { CustomAccordion } from "../Accordion/Accordion";
import Image from "next/image";
import { Images } from "@/constants";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export interface IProfileSideProps {}

export function ProfileSide(props: IProfileSideProps) {
  return (
    <div className="side-profile-container">
      <div className="profile-header flex-space">
        <h4>
          my profile
          <MoreVertIcon />
        </h4>
      </div>

      <div className="profile-info flex-center">
        <Button
          component="label"
          variant="text"
          // startIcon={<CloudUploadIcon />}
          href="#file-upload"
        >
          <Image
            src={Images.avatar1}
            width={0}
            height={0}
            alt="avatar"
            priority
          />
          <VisuallyHiddenInput type="file" />
        </Button>

        <h5>patricia smith</h5>
        <p>
          <CheckCircleRoundedIcon fontSize="small" className="info-icon" />
          active
        </p>
      </div>

      <div className="profile-about">
        <CustomAccordion
          panelOrder="panel1"
          title="About"
          preprendIcon={<PersonRoundedIcon fontSize="small" />}
        >
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </CustomAccordion>

        <CustomAccordion
          panelOrder="panel2"
          title="Attached Files"
          preprendIcon={<AttachFileRoundedIcon fontSize="small" />}
        >
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </CustomAccordion>
      </div>
    </div>
  );
}

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
