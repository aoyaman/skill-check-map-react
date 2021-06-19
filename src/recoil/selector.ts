import { db } from "../firebase";
import { selector } from 'recoil';
import { SkillMap } from '../types/skillmap';

export const mapsQuery = selector({
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
