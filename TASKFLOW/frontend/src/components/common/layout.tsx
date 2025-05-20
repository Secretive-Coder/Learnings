import Navbar from "./navbar";

type User = {
  email: string;
  name: string;
  avatar: string;
};

type LayoutProps = {
  user: User | null;
  onLogout: () => void;
};

const Layout = ({ onLogout, user }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />
    </div>
  );
};

export default Layout;
