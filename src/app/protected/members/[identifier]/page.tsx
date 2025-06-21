export default async function Home({ params }: { params: Promise<{ identifier: string }> }) {
  const identifier = (await params).identifier
  
  return (
    <>Dobrodošao {`${identifier}`}</>
  );
}
