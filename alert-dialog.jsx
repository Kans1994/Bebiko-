import React, { createContext, useContext, useState } from 'react';

const DialogContext = createContext(null);

export function AlertDialog({ children }) {
  const [open, setOpen] = useState(false);
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

export function AlertDialogTrigger({ asChild, children }) {
  const ctx = useContext(DialogContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (event) => {
        children.props.onClick?.(event);
        ctx?.setOpen(true);
      },
    });
  }
  return <button onClick={() => ctx?.setOpen(true)}>{children}</button>;
}

export function AlertDialogContent({ children }) {
  const ctx = useContext(DialogContext);
  if (!ctx?.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C2825]/45 p-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#DBCAC0] bg-white p-5 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="mb-4 space-y-2">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="font-heading text-xl text-[#2C2825]">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-sm leading-relaxed text-[#8A7F76]">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-5 flex justify-end gap-3">{children}</div>;
}

export function AlertDialogCancel({ children, ...props }) {
  const ctx = useContext(DialogContext);
  return (
    <button
      type="button"
      onClick={() => ctx?.setOpen(false)}
      className="rounded-xl border border-[#DBCAC0] px-4 py-2 text-sm font-medium text-[#2C2825]"
      {...props}
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick, className = '', ...props }) {
  const ctx = useContext(DialogContext);
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        ctx?.setOpen(false);
      }}
      className={`rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
