const fs = require("fs").promises;
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const writeContactsToFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(dataString);
  return data;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);
  if (!contactById) return null;
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeContactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (removeContactIndex === -1) {
    return null;
  }
  const deleteContact = contacts[removeContactIndex];
  contacts.splice(removeContactIndex, 1);
  writeContactsToFile(contacts);
  return deleteContact;
};

const addContact = async ({ name, email, phone }) => {
  const id = uuidv4();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  const contactIsInList = contacts.find((c) => c.phone === phone);
  if (contactIsInList) {
    return null;
  }
  contacts.push(newContact);
  writeContactsToFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updateIndex = contacts.findIndex(({ id }) => id === contactId);
  if (updateIndex === -1) {
    return null;
  }
  contacts[updateIndex] = { ...body, contactId };
  writeContactsToFile(contacts);
  return contacts[updateIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
