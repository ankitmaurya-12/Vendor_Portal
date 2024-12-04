import { useState, useEffect } from 'react';

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('https://services.odata.org/TripPinRESTierService/(S(m0pq14rzngg3cgicqx3cnr1f))/People');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setPeople(data.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading profiles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-[70%] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        People Directory
      </h1>
      
      <div className="space-y-3">
        {people.map((person) => (
          <div
            key={person.UserName}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedUser(expandedUser === person.UserName ? null : person.UserName)}
            >
              <div className="flex items-center space-x-4">
                {/* <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                  {getInitials(person.FirstName, person.LastName)}
                </div>  */}
                
                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-gray-800">
                    {person.FirstName} {person.LastName}
                  </h2>
                  <p className="text-sm text-gray-500">{person.UserName}</p>
                </div>

                <svg
                  className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                    expandedUser === person.UserName ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-200 ${
                expandedUser === person.UserName ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-4 border-t border-gray-100 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Email Addresses</h3>
                  {person.Emails.map((email, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{email}</span>
                    </div>
                  ))}
                </div>

                {person.AddressInfo && person.AddressInfo.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Address</h3>
                    <div className="text-sm text-gray-600">
                      <p>{person.AddressInfo[0].Address}</p>
                      <p>{person.AddressInfo[0].City.Name}, {person.AddressInfo[0].City.Region}</p>
                      <p>{person.AddressInfo[0].City.CountryRegion}</p>
                    </div>
                  </div>
                )}

                {person.Features && person.Features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {person.Features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleList;