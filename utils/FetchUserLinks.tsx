import { auth, db } from "@/config/Config";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function FetchUserBlogs() {
  // const {setError, setLoading} = useBlogContext()
  const user = auth.currentUser;

  if (user) {
    const userUid = user.uid;
    const userCollection = collection(db, "profileData");
    const q = query(userCollection, where("uid", "==", userUid));

    // setLoading?.(true)
    try {
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // setLoading?.(false)
      if (!userData) console.log("no link found");
      return userData;
    } catch (error: any) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("No user is currently logged in.");
  }
}
