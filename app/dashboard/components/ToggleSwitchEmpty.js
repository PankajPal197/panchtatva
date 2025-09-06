const ToggleSwitchEmpty = ({ checked, onToggle, id }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        id={id}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-red-500 rounded-full peer peer-checked:bg-green-500 relative">
        <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full"></div>
      </div>
    </label>
  );
};

export default ToggleSwitchEmpty;
