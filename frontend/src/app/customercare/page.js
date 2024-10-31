"use client"
import React, { useState } from 'react';
import { Phone, Mail, HelpCircle, MessageCircle, ClipboardList } from 'lucide-react';

const CustomerCarePage = () => {
    const [activeForm, setActiveForm] = useState('feedback');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
        alert('Thank you for your submission! We will get back to you soon.');
    };

    const faqItems = [
        {
            question: "How do I search for bus routes?",
            answer: "Use the 'Route Search' feature on the main page. Enter your source and destination, and we'll show you available routes."
        },
        {
            question: "How can I save my preferred routes?",
            answer: "After searching a route, click the 'Save Route' button. Your saved routes will appear in the 'My Routes' section."
        },
        {
            question: "How does real-time tracking work?",
            answer: "Our GPS-enabled system tracks bus locations in real-time. Ensure you have a stable internet connection for the most accurate tracking."
        },
        {
            question: "What should I do if the app shows inaccurate bus locations?",
            answer: "Report the issue through our 'Report a Problem' form, providing details of the route and time of inaccuracy."
        }
    ];

    return (
        <div className="min-h-screen bg-[#15151a] text-white">
            <div className="w-3/4 flex flex-col items-center container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-white mb-10 text-center border-b border-gray-800 pb-4">
                    Customer Care
                </h1>

                {/* Contact Information */}
                <section className="w-full mb-12 bg-[#0c0c0f] p-6 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center border-b border-gray-800 pb-3">
                        <Phone className="mr-3 text-white" /> Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#282c35] p-4 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Customer Support Helpline</h3>
                            <p className="text-gray-300">+91-80-BMTC-HELP (2684-4357)</p>
                            <p className="text-gray-400">Operating Hours: 7 AM - 10 PM, Daily</p>
                        </div>
                        <div className="bg-[#282c35] p-4 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Email Support</h3>
                            <p className="text-gray-300">customer.support@bmtc.in</p>
                            <p className="text-gray-400">Response within 24-48 hours</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="w-full mb-12 bg-[#0c0c0f] p-6 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center border-b border-gray-800 pb-3">
                        <HelpCircle className="mr-3 text-white" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqItems.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#282c35] p-4 rounded-xl hover:bg-gray-700 transition-colors duration-300"
                            >
                                <h3 className="font-bold mb-2 text-white">{faq.question}</h3>
                                <p className="text-gray-300">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Feedback and Complaint Form */}
                <section className="w-3/4 bg-[#0c0c0f] p-6 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center border-b border-gray-800 pb-3">
                        <MessageCircle className="mr-3 text-white" /> Feedback & Support
                    </h2>

                    <div className="flex mb-6 space-x-4">
                        <button
                            className={`py-2 px-4 rounded-xl transition-colors duration-300 ${activeForm === 'feedback'
                                    ? 'bg-white text-black'
                                    : 'bg-[#282c35] text-gray-300 hover:bg-gray-700'
                                }`}
                            onClick={() => setActiveForm('feedback')}
                        >
                            Feedback
                        </button>
                        <button
                            className={`py-2 px-4 rounded-xl transition-colors duration-300 ${activeForm === 'complaint'
                                    ? 'bg-white text-black'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            onClick={() => setActiveForm('complaint')}
                        >
                            Report an Issue
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">

                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-[#282c35] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                            required
                        >
                            <option value="" className="bg-black">Select Subject</option>
                            <option value="route" className="bg-black">Route Information</option>
                            <option value="tracking" className="bg-black">Bus Tracking</option>
                            <option value="app" className="bg-black">Mobile App</option>
                            <option value="other" className="bg-black">Other</option>
                        </select>
                        <textarea
                            name="message"
                            placeholder={activeForm === 'feedback'
                                ? "Share your suggestions or feedback"
                                : "Describe the issue you're experiencing"}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-[#282c35] text-white border border-gray-700 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-white"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-1/4 bg-white font-semibold text-black hover:bg-gray-100 rounded-xl py-3 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                        >
                            Submit {activeForm === 'feedback' ? 'Feedback' : 'Complaint'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default CustomerCarePage;