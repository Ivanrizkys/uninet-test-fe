interface ProfileDataProps {
  id: string;
  name: string;
  username: string;
  email: string;
}

function ProfileData({ id, name, username, email }: ProfileDataProps) {
  return (
    <>
      <div className="w-52 h-52 rounded-full overflow-hidden">
        <img
          src="https://source.unsplash.com/random/208×208/?profile"
          alt="profile picture"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="font-bold text-2xl text-center text-foreground">{name}</h2>
      <div className="text-base text-primary text-center">
        <p className="font-bold">ID</p>
        <p className="font-normal">{id}</p>
      </div>
      <div className="text-base text-primary text-center">
        <p className="font-bold">USERNAME</p>
        <p className="font-normal">{username}</p>
      </div>
      <div className="text-base text-primary text-center">
        <p className="font-bold">EMAIL</p>
        <p className="font-normal">{email}</p>
      </div>
    </>
  );
}

export default ProfileData;
