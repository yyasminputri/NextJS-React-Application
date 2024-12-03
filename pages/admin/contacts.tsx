import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';

interface Contact {
  id: number;
  nama: string;
  email: string;
  messages: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [newContact, setNewContact] = useState<Contact>({
    id: 0,
    nama: '',
    email: '',
    messages: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!newContact.nama.trim() || !newContact.email.trim()) {
        setError('Name and Email are required');
        return;
      }

      if (newContact.id) {
        await axios.put(`/api/contacts/${newContact.id}`, newContact, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        await axios.post('/api/contacts', newContact, {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      setNewContact({
        id: 0,
        nama: '',
        email: '',
        messages: ''
      });
      setShowAddModal(false);
      await fetchContacts();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to save contact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setNewContact({
      id: contact.id,
      nama: contact.nama,
      email: contact.email,
      messages: contact.messages
    });
    setShowAddModal(true);
  };

  const handleDeleteContact = async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this contact?')) {
        await axios.delete(`/api/contacts/${id}`);
        await fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FF]">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Contacts
              </h1>
              <p className="text-gray-500 mt-1">Manage your contacts collection</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              Add Contact
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-7xl mx-auto mb-6">
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Messages</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-6 text-sm text-gray-600">{contact.nama}</td>
                    <td className="p-6 text-sm text-gray-600">{contact.email}</td>
                    <td className="p-6 text-sm text-gray-600">{contact.messages}</td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Contact Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl m-4">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {newContact.id ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                <form onSubmit={handleAddContact} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="nama"
                      value={newContact.nama}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Contact Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newContact.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Contact Email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Messages</label>
                    <textarea
                      name="messages"
                      value={newContact.messages}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Messages"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Contact'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
