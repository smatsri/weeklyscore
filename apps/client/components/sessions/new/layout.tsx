export const Title = ({ title }: { title: string }) => (
  <h1 className="text-3xl font-bold mb-6 text-right">{title}</h1>
);
export const Main = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-6">{children}</div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="font-sans container mx-auto px-4 py-8">{children}</div>
);
