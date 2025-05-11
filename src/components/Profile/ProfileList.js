import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectUserById } from "../../features/users/usersApiSlice";
import { selectAllUserImgs} from '../../features/profileImage/userImgApiSlice'
import { selectAllRecipes } from '../../features/recipes/recipeApiSlice'
import { useSelector } from "react-redux";
import Profile from "./Profile";

const ProfileList = () => {
  const { id } = useParams();
  const userData = useSelector((state) => selectUserById(state, id));
  const profileImgData = useSelector(selectAllUserImgs)
  const recipeData = useSelector(selectAllRecipes)

  const profileImage = profileImgData.filter(image => image.user === id)
  const userRecipes = recipeData.filter(recipe => recipe.user === id)
 
  const [user, setUser] = useState(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return <Profile user={user} userRecipes={userRecipes} profileImage={profileImage[0]?.url} />;
};

export default ProfileList;
