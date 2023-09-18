import * as React from "react";
import * as Yup from "yup";

import { Avatar, Button, IconButton } from "@mui/material";
import { Form, Formik } from "formik";

import { BaseItemLoader } from "../../../components/common/Loader/BaseItemLoader";
import ClearIcon from "@mui/icons-material/Clear";
import { ContactInvite } from "../../../models";
import { CustomMenu } from "../../../components/common/Menu/Menu";
import CustomModal from "../../../components/common/Modal/Modal";
import { InputField } from "../../../components/common/InputField/InputField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "./SideWrapper";
import { contactOptions } from "../../../constants";
import { selectFetching } from "../dashboardSlice";
import { useAppSelector } from "../../../app/store";
import { users } from "../../../mock";

export function ContactSide() {
  const fetching = useAppSelector(selectFetching);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
  };

  const initialValues: ContactInvite = {
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required !!"),
  });

  const handleSendInviteFriend = (values: ContactInvite) => {
    console.log(
      "🚀 ~ file: ContactSide.tsx:33 ~ handleSendInviteFriend ~ values:",
      values
    );
  };

  return (
    <SideWrapper
      title="contacts"
      icon={
        <IconButton onClick={() => setIsOpen(true)}>
          <PersonAddIcon />
        </IconButton>
      }
      header={
        <InputField
          onChange={handleFieldChange}
          type="email"
          label="Find users"
          prependIcon={<SearchIcon />}
          autoFocus={false}
        />
      }
    >
      <CustomModal
        styles={{
          width: "31rem",
        }}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <div className="modal-header flex justify-between items-center p-4">
          <h5 className="font-semibold capitalize"> add contact </h5>
          <IconButton onClick={() => setIsOpen(false)}>
            <ClearIcon />
          </IconButton>
        </div>

        <div className="modal-body p-6">
          <Formik
            onSubmit={handleSendInviteFriend}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formikProps) => {
              const {
                handleBlur,
                handleChange,
                touched,
                errors,
                isSubmitting,
                dirty,
                isValid,
              } = formikProps;
              return (
                <Form>
                  <InputField
                    className="mb-4"
                    autoFocus={false}
                    type="email"
                    label="Enter Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <InputField
                    className="mb-4"
                    autoFocus={false}
                    type="text"
                    label="Enter Message"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div className="moda-footer p-3 w-full flex justify-end">
                    <Button
                      sx={{
                        background: "#7269ef",
                        textTransform: "capitalize",
                        padding: "0.5rem 1rem",
                      }}
                      type="button"
                      variant="contained"
                      disabled={isSubmitting || !isValid || !dirty}
                    >
                      add this contact
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </CustomModal>
      <div className="contacts w-full h-96 overflow-auto">
        <div className="contact-item">
          <div className="p-3 uppercase font-semibold">a</div>

          <ul className="capitalize">
            {fetching.isConversation ? (
              <BaseItemLoader listToRender={5} />
            ) : (
              users.map((user, key) => {
                return (
                  <li key={key} className=" p-3 w-full flex justify-between">
                    <Button className="w-full">
                      <div className="flex items-center justify-start w-full">
                        <Avatar src={user.avatar} />

                        <h5 className="ml-2 text-black font-semibold capitalize">
                          {user.username}
                        </h5>
                      </div>
                    </Button>

                    <CustomMenu
                      icon={<MoreVertIcon />}
                      direction="rtl"
                      menu={contactOptions}
                      menuItemStyle={{
                        color: "#7a7f9a",
                      }}
                    />
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </SideWrapper>
  );
}
