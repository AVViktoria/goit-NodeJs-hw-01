//   Modules
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.resolve("./db/contacts.json");

//   Functions  readFile  and   writeFile
const getContactsList = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};
const writeContacts = async (cnt) => {
  return await fs.writeFile(contactsPath, JSON.stringify(cnt));
};

async function listContacts() {
  try {
    const contacts = await getContactsList();
    return console.table(contacts);
  } catch (err) {
    return console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContactsList();
    const currentContact = contacts.find((item) => item.id === contactId);
    if (!currentContact) {
      return null;
    }
    return console.log(currentContact);
  } catch (err) {
    return console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContactsList();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await writeContacts(contacts);
    return console.table(removeContact);
  } catch (err) {
    return console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContactsList();
    const newContact = { id: randomUUID(), name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
    return console.table(newContact);
  } catch (err) {
    return console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
