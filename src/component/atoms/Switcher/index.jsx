export default function Switcher({ checked, label, onClick, onChange }) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckChecked"
        checked={checked}
        onClick={onClick}
        onChange={onChange}
      />
      <label className="form-check-label" for="flexSwitchCheckChecked">
        {label}
      </label>
    </div>
  );
}
