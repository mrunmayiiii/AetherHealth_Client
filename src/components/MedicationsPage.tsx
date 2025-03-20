import React, { useState } from 'react';
import { Check, X, Clock, PlusCircle, Calendar, Info, AlertCircle } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  taken: boolean;
  time?: string;
}

const MedicationsPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      instructions: "Take with meals",
      taken: false,
      time: "8:00 AM, 6:00 PM"
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      instructions: "Take in the morning",
      taken: false,
      time: "8:00 AM"
    },
    {
      id: 3,
      name: "Aspirin",
      dosage: "81mg",
      frequency: "Once daily",
      instructions: "Take with food",
      taken: false,
      time: "8:00 AM"
    }
  ]);

  const [activeTab, setActiveTab] = useState('today');

  const toggleMedicationStatus = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Medication Tracker</h1>
        <p className="text-gray-600 mt-2">Keep track of your medications and never miss a dose</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex mb-6 border-b">
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'today' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('today')}
          >
            Today's Medications
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            All Medications
          </button>
        </div>
        
        {activeTab === 'today' && (
          <div className="space-y-4">
            {medications.map((medication) => (
              <div key={medication.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${medication.taken ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {medication.taken ? 
                      <Check className="w-5 h-5 text-green-600" /> : 
                      <Clock className="w-5 h-5 text-blue-600" />
                    }
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{medication.name} {medication.dosage}</h3>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {medication.time}
                    </div>
                    <div className="text-sm text-gray-500">{medication.instructions}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleMedicationStatus(medication.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    medication.taken
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  {medication.taken ? (
                    <>
                      <Check className="w-4 h-4 inline mr-1" />
                      Taken
                    </>
                  ) : (
                    <>
                      Mark as Taken
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'all' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medications.map((medication) => (
                  <tr key={medication.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{medication.dosage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{medication.frequency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{medication.instructions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleMedicationStatus(medication.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          medication.taken
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {medication.taken ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Taken
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 mr-1" />
                            Not Taken
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Medication Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-blue-600 text-2xl font-bold">{medications.length}</div>
            <div className="text-gray-600">Active Medications</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-green-600 text-2xl font-bold">
              {medications.filter(med => med.taken).length}/{medications.length}
            </div>
            <div className="text-gray-600">Taken Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;

