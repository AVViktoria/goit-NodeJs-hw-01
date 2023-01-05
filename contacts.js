//   Modules
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

//   Functions  readFile  and   writeFile
const getContactsList = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};
const writeContacts = async (cont) => {
  return await fs.writeFile(contactsPath, JSON.stringify(cont));
};

const listContacts = async()=> {
  // const data = await fs.readFile(contactsPath);
  // const products = JSON.parse(data);
  const contacts= await getContactsList();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await getContactsList();
    const currentContact = contacts.find(item => item.id === contactId);
    if(!currentContact){
        return null;
    }
    return currentContact;
}

async function removeContact(contactId) {
  const contacts = await getContactsList();
  const idx = contacts.findIndex(item => item.id === contactId);
  if(idx === -1){
      return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await writeContacts(contacts);
  return removeContact;
 
}

async function addContact(name, email, phone) {
  const contacts = await getContactsList();
    const newContact = {id: randomUUID(), name, email, phone};
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  }


module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
