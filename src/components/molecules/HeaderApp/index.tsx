interface HeaderAppProps {
  title: string;
  description: string;
}

function HeaderApp({ title, description }: HeaderAppProps) {
  return (
    <>
      <h1 className="text-foreground text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </>
  );
}

export default HeaderApp;
