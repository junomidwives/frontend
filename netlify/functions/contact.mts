import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.junomidwives.co.uk",
  port: 465,
  secure: true,
  auth: {
    user: "contact@junomidwives.co.uk",
    pass: "%11>7[6K4<13",
  },
});

export default async (req: Request) => {
  const { name, email, message } = await req.json();

  transporter.sendMail(
    {
      from: '"Juno Midwives" <contact@junomidwives.co.uk>',
      to: "hello@stuartsewell.dev",
      subject: "Website enquiry",
      text: `Name: ${name} \nEmail: ${email} \nMessage: ${message}`,
    },
    (error, info) => {
      if (!error) console.log(error);
      else console.log(info);
    }
  );
};
