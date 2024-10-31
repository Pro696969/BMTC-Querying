import React from 'react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Kiran J Rajpurohit',
      role: 'Core Programmer',
      image: 'Kiran.jpeg',
    },
    {
      name: 'Krishna Kumar',
      role: 'Co Programmer',
      image: 'kk.png',
    },
  ];

  return (
    <div className="min-h-screen bg-[#15151a]">

      {/* Hero Section */}
      <div className="bg-[#0c0c0f] py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-100 mb-4">
            About Us
          </h1>
          <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto">
            This is a simple app that helps simplify querying of BMTC Bus Routes so that you're always on time!
          </p>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl text-white font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
