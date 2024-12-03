// File: pages/api/contacts/[id].ts
import { Contact } from "../../../sequelize"; // Assuming Contact is the Sequelize model for contacts

export default async function handler(req, res) {
  const { id } = req.query;

  // Handle PUT request to update a contact
  if (req.method === 'PUT') {
    try {
      const { nama, email, messages } = req.body;

      if (!nama || !email || !messages) {
        return res.status(400).json({ error: 'Name, email, and messages are required' });
      }

      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      await contact.update({
        nama: nama.trim(),
        email: email.trim(),
        messages,
      });

      const updatedContact = await Contact.findByPk(id);

      return res.status(200).json(updatedContact);
    } catch (error) {
      console.error('Error updating contact:', error);
      return res.status(500).json({ error: 'Failed to update contact' });
    }
  }

  // Handle DELETE request to delete a contact
  if (req.method === 'DELETE') {
    try {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      await contact.destroy();
      return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      return res.status(500).json({ error: 'Failed to delete contact' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
