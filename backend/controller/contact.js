import Contact from "../model/contact.js";

export const insertMessages = async (req, res) => {
  const { firstName, lastName, email, message, contactNumber } = req.body;

  const contact = await Contact.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    message: message,
    contactNumber: contactNumber,
  });
  if (contact) {
    console.log("message sent");
    res.json("User created");
  } else {
    console.log("message failed");
  }
};

export const getMessages = async (req, res) => {
  const getMessages = await Contact.find();
  console.log(getMessages);
  res.status(200).json({getMessages});
};
