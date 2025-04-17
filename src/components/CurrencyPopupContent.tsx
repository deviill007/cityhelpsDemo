const currencies = [
    "Indian Rupee ₹ ✓", "Euro €", "U.S. Dollar $", "British Pound £", "Australian Dollar A$",
    "Swiss Franc CHF", "UAE Dirham د.إ", "Bulgarian Lev лв", "Canadian Dollar C$",
    "Chilean Peso CL$", "Chinese Yuan RMB¥", "Colombian Peso COL$", "Czech Koruna Kč",
    "Danish Krone DKK", "Egyptian Pound £E", "Hong Kong Dollar HK$", "Hungarian Forint Ft",
    "Indonesian Rupiah Rp", "Israeli New Shekel ₪", "Japanese Yen ¥", "South Korean Won ₩",
    "Moroccan Dirham د.م."
  ];
  
  export default function CurrencyPopupContent() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Select Your Currency</h2>
        <div className="currency-grid scrollable max-h-64 overflow-y-auto">
          {currencies.map((currency, index) => (
            <div key={index} className="currency-item">
              {currency}
            </div>
          ))}
        </div>
      </div>
    );
  }