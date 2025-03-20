import React, { useState } from 'react';
import { Calculator, Scale, Ruler, User, Info } from 'lucide-react';

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const calculateBmi = () => {
    if (!weight || !height || !age) return;

    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100;
    const bmiValue = weightKg / (heightM * heightM);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const getBmiGradient = () => {
    if (!bmi) return 'bg-blue-50';
    if (bmi < 18.5) return 'bg-gradient-to-r from-blue-100 to-blue-200';
    if (bmi < 25) return 'bg-gradient-to-r from-green-100 to-green-200';
    if (bmi < 30) return 'bg-gradient-to-r from-orange-100 to-orange-200';
    return 'bg-gradient-to-r from-red-100 to-red-200';
  };

  const getCategoryColor = () => {
    if (category === 'Underweight') return 'bg-blue-500';
    if (category === 'Normal weight') return 'bg-green-500';
    if (category === 'Overweight') return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCategoryMessage = () => {
    if (category === 'Underweight') {
      return 'A BMI below 18.5 indicates you may be underweight. Consider consulting with a healthcare professional.';
    } else if (category === 'Normal weight') {
      return 'Your BMI is within the healthy weight range. Maintain a balanced diet and regular exercise.';
    } else if (category === 'Overweight') {
      return 'A BMI between 25 and 29.9 indicates you may be overweight. Consider lifestyle changes for better health.';
    } else if (category === 'Obese') {
      return 'A BMI of 30 or higher indicates obesity. It\'s advisable to consult with a healthcare professional.';
    }
    return '';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 rounded-full p-3 shadow-md">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">BMI Calculator</h2>
        </div>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition duration-200"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {showInfo && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700 border-l-4 border-blue-500">
          <p className="font-medium mb-2">What is BMI?</p>
          <p>Body Mass Index (BMI) is a value derived from a person's weight and height. It provides a simple numeric measure of a person's thickness or thinness, allowing health professionals to discuss weight problems more objectively with patients.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-2">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <label htmlFor="age" className="text-sm font-medium text-gray-700">
              Age
            </label>
          </div>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Years"
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-2">
              <Scale className="h-5 w-5 text-blue-600" />
            </div>
            <label htmlFor="weight" className="text-sm font-medium text-gray-700">
              Weight
            </label>
          </div>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="kg"
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-2">
              <Ruler className="h-5 w-5 text-blue-600" />
            </div>
            <label htmlFor="height" className="text-sm font-medium text-gray-700">
              Height
            </label>
          </div>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="cm"
          />
        </div>
      </div>

      <button
        onClick={calculateBmi}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Calculate BMI
      </button>

      {bmi !== null && (
        <div className={`mt-8 p-6 rounded-xl ${getBmiGradient()} transition-all duration-500`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-sm bg-white/30 rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2 font-medium">Your BMI</p>
              <div className="flex items-baseline">
                <p className="text-4xl font-bold text-gray-900">{bmi}</p>
                <p className="text-sm text-gray-500 ml-2">kg/m²</p>
              </div>
            </div>
            <div className="backdrop-blur-sm bg-white/30 rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2 font-medium">Category</p>
              <span className={`inline-block px-4 py-2 rounded-lg font-medium text-white ${getCategoryColor()}`}>
                {category}
              </span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/50 rounded-lg">
            <p className="text-sm text-gray-700">
              {getCategoryMessage()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;