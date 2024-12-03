"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@/components/Container";

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [newContact, setNewContact] = useState({
    nama: "",
    email: "",
    messages: "",
  });

  useEffect(() => {
    // Fetch contacts when component mounts
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Handle changes in form input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };

  // Handle form submission to add new contact
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/contacts", newContact);
      setContacts([...contacts, response.data]);  // Update state with new contact
      setNewContact({
        nama: "",
        email: "",
        messages: "",
      });  // Reset form after submission
    } catch (error) {
      console.error("Failed to add contact:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="text-center my-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Contact Us
          </h1>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                id="nama"
                type="text"
                value={newContact.nama}
                onChange={handleChange}
                name="nama"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={newContact.email}
                onChange={handleChange}
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Messages
              </label>
              <textarea
                value={newContact.messages}
                onChange={handleChange}
                name="messages"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter messages"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
              >
                Contact Us
              </button>
            </div>
          </form>
        </div>

        {/* Display added contacts below */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Contacts</h2>
          {contacts.length > 0 ? (
            <div className="space-y-6 mt-6">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {contact.nama}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{contact.email}</p>
                  <div className="mt-4">
                    <p className="text-gray-800 dark:text-white">Messages: {contact.messages}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No contacts added yet.</p>
          )}
        </div>
      </Container>
    </>
  );
}
