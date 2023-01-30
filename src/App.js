import React from "react";
import { Users } from "./components/Users";
import { Success } from "./components/Success";
import "./index.scss";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [serchValue, setSerchValue] = React.useState("");
  const [invites, setInvites] = React.useState([]);
  const [succes, setSucces] = React.useState(false);

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователа");
      })
      .finally(() => setLoading(false));
  }, []);

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id != id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onChangeSearchValue = (event) => {
    setSerchValue(event.target.value);
  };
  const onClickSendInvites = () => {
    setSucces(true);
  };

  return (
    <div className="App">
      {succes ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          serchValue={serchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
