import HomepageForm from "@/components/HomepageForm";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <section className="hidden md:flex md:flex-1 bg-black"></section>

      <HomepageForm />
    </main>
  );
};

export default Home;
