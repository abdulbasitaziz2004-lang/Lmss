import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import ClientLayout from "./Clientlayout.jsx";
 
export default async function Layout({ children }) {
  const user = await getCurrentDbUser();
 
  return (
    <ClientLayout userRole={user?.role}>
      {children}
    </ClientLayout>
  );
}
 