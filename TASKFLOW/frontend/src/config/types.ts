export type User = {
  email: string;
  name: string;
  avatar: string;
};

export type RootContext = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

export type Task = {
  _id?: string;
  id?: string;
  title: string;
  createdAt?: string;
  completed: boolean | number | string;
};

export type FormField = "name" | "email" | "password";

export type SignUpProps = {
  onSwitchMode: () => void;
  onSubmit?: (data: { email: string; name?: string }) => void;
};

export type LayoutProps = {
  user: User | null;
  onLogout: () => void;
};

export type SidebarProps = {
  user: User | null;
  tasks: Task[];
};
