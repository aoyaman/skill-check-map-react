import { useRecoilValue } from "recoil";
import { db } from "../../../firebase";
import { selector } from 'recoil';
import { Container, CssBaseline } from "@material-ui/core";
import Header from "./Header";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";


export type SkillMap = {
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

function Home() {
  let match = useRouteMatch();

  const mapList:SkillMap[] = useRecoilValue(mapsQuery);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Skill Map" maps={mapList} />
        <Switch>
          <Route path={`${match.path}/:mapId`}>
            <Topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select a map</h3>
          </Route>
        </Switch>
      </Container>
    </>
  );
}

interface ParamTypes {
  mapId: string
}

function Topic() {
  let { mapId } = useParams<ParamTypes>();
  return <h3>Requested topic ID: {mapId}</h3>;
}

export default Home;
