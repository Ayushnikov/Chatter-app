import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // Fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Ensure userId is a string
  const userId = userInfo._id.toString();

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userId} />
    </>
  );
}

export default Page;