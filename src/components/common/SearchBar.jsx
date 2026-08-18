import "./SearchBar.css";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
    />
  );
}

export default SearchBar;