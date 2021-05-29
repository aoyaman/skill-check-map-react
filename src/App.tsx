import React, { useState, useEffect } from "react";
import { db } from "./firebase";

type SkillMap = {
  id: string;
  name: string;
};

function App() {
  // const [users, setUsers] = useState<User[]>([
  //   { id: "ID1", name: "ゾンビ", height: 195 },
  //   { id: "ID2", name: "スケルトン", height: 199 },
  //   { id: "ID3", name: "クリーパー", height: 170 },
  // ]);

  const [users, setUsers] = useState<SkillMap[]>([]);

  // === 追記分 ===
  useEffect(() => {
    // 取得結果をコンソールに出力
    const usersRef = db.collection("maps");
    usersRef.get().then((snapshot) => {
      let userList:SkillMap[] = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, doc.data())
        userList.push({
          id: doc.id,
          name: doc.data().name
        })
      });
      setUsers(userList);
    });
  }, []);
  // =============

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default App;
