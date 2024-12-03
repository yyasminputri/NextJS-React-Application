// File: pages/api/contacts/index.ts
import { Contact } from "../../../sequelize"; // Assuming Contact is the Sequelize model for contacts

export default async function handler(req, res) {
  // Handle GET request to fetch all contacts
  if (req.method === 'GET') {
    try {
      const contacts = await Contact.findAll();
      return res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  }

  // Handle POST request to create a new contact
  if (req.method === 'POST') {
    try {
      const { nama, email, messages } = req.body;

      if (!nama || !email || !messages) {
        return res.status(400).json({ error: 'Name, email, and messages are required' });
      }

      const newContact = await Contact.create({
        nama: nama.trim(),
        email: email.trim(),
        messages,
      });

      return res.status(201).json(newContact);
    } catch (error) {
      console.error('Error creating contact:', error);
      return res.status(500).json({ error: 'Failed to create contact' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
