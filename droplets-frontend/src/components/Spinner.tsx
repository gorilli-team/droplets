// components/Spinner.tsx
const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-t-4 border-transparent border-solid rounded-full border-purple-500 border-opacity-20"></div>
    </div>
  </div>
);

export default Spinner;
