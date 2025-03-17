import "../styles/AuthImagePattern.css";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="auth-pattern-container">
      <div className="auth-pattern-content">
        <div className="pattern-grid">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`pattern-square ${i % 2 === 0 ? "pulse-animation" : ""}`}
            />
          ))}
        </div>
        <h2 className="auth-pattern-title">{title}</h2>
        <p className="auth-pattern-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;