export function FormLabel({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export function FormInput({ label, required, error, ...props }) {
  return (
    <div>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <input
        className={`
          w-full px-3 py-2 
          border rounded-lg 
          text-sm
          transition-all
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? "border-red-300 focus:ring-red-500" : "border-gray-300"}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function FormTextarea({ label, required, error, rows = 3, ...props }) {
  return (
    <div>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <textarea
        rows={rows}
        className={`
          w-full px-3 py-2 
          border rounded-lg 
          text-sm
          transition-all
          resize-none
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? "border-red-300 focus:ring-red-500" : "border-gray-300"}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function FormSelect({ label, required, error, children, ...props }) {
  return (
    <div>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <select
        className={`
          w-full px-3 py-2 
          border rounded-lg 
          text-sm
          transition-all
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? "border-red-300 focus:ring-red-500" : "border-gray-300"}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
