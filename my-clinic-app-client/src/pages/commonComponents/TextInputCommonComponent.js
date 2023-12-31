const TextInput = ({ id, label, value, onChange, type = 'text', required = false, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700">{label}:</label>
    <input
      type={type}
      size={40}
      id={id}
      className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default TextInput;
