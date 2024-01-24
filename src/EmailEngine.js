import emailjs from "@emailjs/browser";

const emailServieID = "shopinsta";
const emailTemplateID = "general_template";
const emailPublicID = "enH3-zmZ4BsR9zctl";

export const sendEmail = (data, template) => {
  emailjs
    .send(emailServieID, template || emailTemplateID, data, emailPublicID)
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
}