export function Campo({ id, label, erro, children, className = '' }) {
    return (
        <div className={`campo ${className}`}>
            <label htmlFor={id}>{label}</label>
            {children}
            {erro && <span className="erro">{erro}</span>}
        </div>
    );
}
