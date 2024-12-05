"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@/components/Container";

interface Membership {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  membershipType: string;
}

export default function Membership() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [newMembership, setNewMembership] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    membershipType: "basic" // default value
  });

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get("/api/memberships");
        setMemberships(response.data);
      } catch (error) {
        console.error("Failed to fetch memberships:", error);
      }
    };

    fetchMemberships();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewMembership({
      ...newMembership,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/memberships", newMembership);
      setMemberships([...memberships, response.data]);
      setNewMembership({
        name: "",
        email: "",
        phoneNumber: "",
        membershipType: "basic"
      });
    } catch (error) {
      console.error("Failed to add membership:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="text-center my-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Join Membership
          </h1>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={newMembership.name}
                onChange={handleChange}
                name="name"
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
                value={newMembership.email}
                onChange={handleChange}
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={newMembership.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="membershipType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Membership Type
              </label>
              <select
                id="membershipType"
                value={newMembership.membershipType}
                onChange={handleChange}
                name="membershipType"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
              >
                Register Membership
              </button>
            </div>
          </form>
        </div>

        {/* Display Members List */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Members List</h2>
          {memberships.length > 0 ? (
            <div className="space-y-6 mt-6">
              {memberships.map((membership) => (
                <div
                  key={membership.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {membership.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{membership.email}</p>
                      <p className="text-gray-600 dark:text-gray-400">{membership.phoneNumber}</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {membership.membershipType.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No members registered yet.</p>
          )}
        </div>
      </Container>
    </>
  );
}