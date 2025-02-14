import { currentUser } from "@clerk/nextjs/server";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  let user = null;

  try {
    user = await currentUser();
  } catch (error) {
    console.error("Error fetching user:", error);
    // Provide a fallback user object or keep it null
    user = {
      id: "guest",
      username: "Guest User",
      firstName: "Guest",
      imageUrl: "/default-profile.png", // Replace with a path to a placeholder image
    };
  }

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use Threds.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;
