import React from "react";
import Header from "./Header";
import { useStateValue } from "../StateProvider";
import Item from "./Item";
import Card from "./Card";

export default function DevPanel() {
  const [{ user, userMeta }] = useStateValue();
  return (
    <Card>
      <div style={{ maxHeight: "200px", overflowY: "auto", padding: "0 2rem" }}>
        {user && userMeta ? (
          <div>
            <Header bold>User Meta (UID) {user?.uid}</Header>
            {Object.keys(userMeta).map((key) => (
              <Item
                key={key}
                title={key}
                subtitle={JSON.stringify(userMeta[key])}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
}
