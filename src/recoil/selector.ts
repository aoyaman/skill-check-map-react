import { db } from "../firebase";
import { atom, selector } from 'recoil';
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
        time: get(queryTime),
      };
    });
    return mapNames;
  },
});

export const queryTime = atom({
  key: 'mapQueryTime',
  default: '',
});
