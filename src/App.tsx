import { useRecoilValue } from "recoil";
import { db } from "./firebase";
import { selector } from 'recoil';

type SkillMap = {
  id: string;
  name: string;
};


const mapsQuery = selector({
  key: 'MapsQuery',
  get: async ({get}) => {
    const maps = await db.collection("maps").get();
    const mapNames:SkillMap[] = [...maps.docs].map((doc) => {
      const mapData = doc.data();
      return {
        id: doc.id,
        name: mapData.name,
      };
    });
    return mapNames;
  },
});

function App() {

  const mapList:SkillMap[] = useRecoilValue(mapsQuery);

  return (
    <div>
      <h2>Users</h2>

        {mapList.map((user) => (
          <div key={user.id}>
            {user.name}
          </div>
        ))}
    </div>
  );
}

export default App;
