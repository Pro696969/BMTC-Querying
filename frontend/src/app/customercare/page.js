"use client"
import { Phone, HelpCircle } from 'lucide-react';

const CustomerCarePage = () => {
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
                            <p className="text-gray-300">080-22952522</p>
                            <p className="text-gray-400">Operating Hours: 11 AM - 2 PM, Monday-Friday</p>
                        </div>
                        <div className="bg-[#282c35] p-4 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Email Support</h3>
                            <p className="text-gray-300">complaints@mybmtc.com</p>
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
            </div>
        </div>
    );
};

export default CustomerCarePage;
