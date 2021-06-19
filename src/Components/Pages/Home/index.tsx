import { useHistory } from "react-router-dom";


function Home() {
  const history = useHistory();

  return (
    <>
      <p>
        <button onClick={() => { history.push("/skillmap")}}>start</button>
      </p>
    </>
  );
}


export default Home;
