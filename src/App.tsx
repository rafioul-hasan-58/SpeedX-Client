import AdminLayout from "./Layout/AdminLayout";
import MainLayout from "./Layout/MainLayout";
import { selectCurrentToken } from "./redux/features/auth/authSlice";
import { useAppSelector } from "./redux/hooks";
import { verifyToken } from "./utils/verifyToken";


const App = () => {
  const token = useAppSelector(selectCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }
  // console.log(user);
  return (
    <div>
      {
        user?.role === 'admin' ? <AdminLayout /> : <MainLayout />
      }
    </div>
  );
};

export default App;