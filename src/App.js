import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import useTitle from "./hooks/useTitle";
import MainPage from "./components/Layouts/MainPage";
import Prefetch from "./features/auth/Prefetch";
import UsersList from "./features/users/UsersList/UsersList";
import SignUp from "./features/auth/SignUp/SignUp";
import EditUser from "./features/users/EditUser";
import PersistLogin from "./features/auth/PersistLogin";
import Login from "./features/auth/Login/Login";
import UsersRecipesList from "./features/recipes/ManageRecipes/UsersRecipes/UsersRecipesList";
import CreateRecipe from "./features/recipes/ManageRecipes/CreateRecipe/CreateRecipe";
import EditRecipe from "./features/recipes/ManageRecipes/EditRecipe";
import Playground from "./components/Playground";
import ResetPassword from "./features/auth/ResetPassword/ResetPassword";
import ProfileList from "./components/Profile/ProfileList";
import ViewRecipe from "./features/recipes/ViewRecipe/ViewRecipe";
import Collection from "./features/recipes/Collection/Collection";

function App() {

  useTitle('TasteBites')
  return (
  <Routes>
    <Route element={<Prefetch/>}> 
    
    <Route path="/signUp" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/reset-password" element={<ResetPassword/>}/>

      <Route path="/" element={<Layout/>}>
      <Route element={<PersistLogin/>}>
        <Route index element={<MainPage/>}/>

        <Route path="playground" element={<Playground/>}/>
        
        <Route path="users">
           <Route index element={<UsersList/>}/>
           <Route path=":id" element={<EditUser/>}/>
        </Route>

        <Route path="profile/:id" element={<ProfileList/>}/>

        <Route path="myRecipes">
          <Route index element={<UsersRecipesList/>}/>
          <Route path="createRecipes" element={<CreateRecipe/>}/>
          <Route path="viewRecipe/:id" element={<ViewRecipe/>}/>
          <Route path=":id" element={<EditRecipe/>}/>
          <Route path="collection" element={<Collection/>}/>
        </Route>

      </Route>
      </Route>
    </Route>
  </Routes>
  );
}

export default App;
